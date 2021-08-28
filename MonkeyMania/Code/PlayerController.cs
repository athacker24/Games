using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityStandardAssets.CrossPlatformInput;
using UnityEngine.SceneManagement;

//Script to controll Abu's actions and intractions with the world
public class PlayerController : MonoBehaviour
{
    private GameObject FColl;
    public int BananaCount;
    public Throwable Banana;
    public Transform LaunchOffset;
    private Rigidbody2D rb;
    private Animator anim;
    public enum State {idle, running, jumping, falling, hurt, dead, throwing}
    public State state = State.idle;
    public int CurrStateH;
    private Collider2D coll;
    public int HeroDirec;
    [SerializeField] private LayerMask ground;
    [SerializeField] private  float speed = 9;
    [SerializeField] private float jumpForce = 19;
    [SerializeField] public int gem = 0;
    [SerializeField] private Text GemText;
    [SerializeField] private Text HealthText;
    [SerializeField] public int health = 5;
    [SerializeField] private float hurtForce = 5;
    public int JumpTrigger = 0;
    private int IsMoving;
    FeetColl feet;
    Fall F;

    private void Start()
    {
        PlayerPrefs.SetInt("GemsLoad", 0);
        gem = PlayerPrefs.GetInt("GemsLoad", 0); 
        rb = GetComponent<Rigidbody2D>();
        anim = GetComponent<Animator>();
        coll = GetComponent<Collider2D>();
        FColl = GameObject.FindWithTag("Feet");
        HeroDirec = 1;
    }

    private void Update()
    {
        IsMoving = 0; //check if Abu is moving
        CurrStateH = (int)state; //used to access Abu's state globally.
        if (state != State.hurt) // abu cant move when hurt
        {
            Movement();
        }
        VelocitySwitch();
        anim.SetInteger("state", (int)state); //set animation state

        if(CrossPlatformInputManager.GetButtonDown("Fire"))
        {
            Instantiate(Banana, LaunchOffset.position, transform.rotation);
                anim.SetTrigger("Throw");
        }
        healthCheck(); // update health
    }

    private void Movement() // movemnet dynamiics of abu
    {
        anim.ResetTrigger("Throw");
        float hOrizontal = CrossPlatformInputManager.GetAxis("Horizontal"); // for running 
        if (hOrizontal < 0) //left move
        {
            if (HeroDirec != -1)
                transform.Rotate(0f, 180f, 0f);
            HeroDirec = -1;
            rb.velocity = new Vector2(-speed, rb.velocity.y);
            IsMoving = 1;
        }
        else if (hOrizontal > 0)  //right move
        {
            if (HeroDirec != 1)
                transform.Rotate(0f, 180f, 0f);
            HeroDirec = 1;
            rb.velocity = new Vector2(speed, rb.velocity.y);
            IsMoving = 1;
        }
        else if( hOrizontal == 0)
        {
            if (IsMoving != 1 && (int)state == 1)
                rb.velocity = Vector3.zero;
        } 

        if (CrossPlatformInputManager.GetButtonDown("Jump")) //for jumping
        {
            if (FColl.GetComponent<FeetColl>().OnGroundCheck == 1 && coll.IsTouchingLayers(ground)) // check if feet are on the ground
            {
                print("feet:  " + FColl.GetComponent<FeetColl>().OnGroundCheck);
                Jump();
            }
            
         }
        if (!coll.IsTouchingLayers(ground) && rb.velocity.y < 1) // for falling without jumping
        {
            state = State.falling;
        }
    }

    public void Jump() //jump function
    {
        rb.velocity = new Vector2(rb.velocity.x, jumpForce);
        state = State.jumping;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        
        if (collision.tag == "Collectable")
        {

            Destroy(collision.gameObject); // collect gems
            gem++;
            GemText.text = gem.ToString();
            PlayerPrefs.SetInt("GemsLoad", gem);
        }
        else if(collision.tag == "Banana") //collect bananas
        {
            Destroy(collision.gameObject);
            health++;
            HealthText.text = health.ToString();
        }
      else if(collision.tag == "deathfall") // fall off the map
      {
            if (FColl.GetComponent<FeetColl>().Death == 1)
            {
                health--;
                print("current health is:  " + health);
                HealthText.text = health.ToString();
                healthCheck();
            }
            FColl.GetComponent<FeetColl>().Death = 0;
            print("current health is after:  " + FColl.GetComponent<FeetColl>().Death);
        }
        

    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.tag == "EnemyMan" || other.gameObject.tag == "EnemyWiz" || other.gameObject.tag == "EnemyFire" || other.gameObject.tag == "Projectile")
        {

                if (state == State.falling && other.gameObject.tag != "Projectile") // jump off enmemy head 
                {
                    Jump();
                }

            else
            {
                state = State.hurt;
                health--; // hurt abu
                HealthText.text = health.ToString();
                if (other.gameObject.transform.position.x > transform.position.x)
                {
                    rb.velocity = new Vector2(-hurtForce, rb.velocity.y); // push back after getting huirt

                }
                else
                {
                    rb.velocity = new Vector2(hurtForce, rb.velocity.y);

                }
                FColl.GetComponent<FeetColl>().OnGroundCheck = 1; // update on ground

            }
        }
    }   //to kill enemy

    private void VelocitySwitch()
    {
        if (state == State.jumping)
        {
            if(rb.velocity.y < 0.1f) //check for apex of jump
            {
                state = State.falling; // change state to falling
            }
        }
        else if(state == State.falling)
        {
            if(coll.IsTouchingLayers(ground))
            {
                state = State.idle;
            }
        }

        else if(state == State.hurt)
        {
            if(Mathf.Abs(rb.velocity.x) < .1f)
            {
                state = State.idle;
            }
        }
        else if(Mathf.Abs(rb.velocity.x) > 2f) //check if moving
        {
           state = State.running;
        }
        else
        {
            state = State.idle; // change state to idle
        }
    }

    public void hurt()
    {
        state = State.hurt;
        health--;
        HealthText.text = health.ToString();
        rb.velocity = new Vector2(-hurtForce, rb.velocity.y);
    }
    public static string PreviousLevel { get; private set; }
    private void OnDestroy()
    {
        PreviousLevel = gameObject.scene.name;
    }

    void healthCheck() // update health to UI
    {
        if(health < 1)
        {
            SceneManager.LoadScene("LevelFail");
        }
    }
}


 