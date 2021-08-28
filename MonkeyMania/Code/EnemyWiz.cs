using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//script to control Enemy Wiz

public class EnemyWiz : MonoBehaviour
{
    private Rigidbody2D rb;
    public Transform LaunchOffset;
    public FireBall fireball;
    private Animator animE;
    [SerializeField] float fireRate;
    float nextFire;
    int stateE;

    void Start()
    {
        fireRate = 5f; // set rate of fire
        nextFire = Time.time;
        rb = GetComponent<Rigidbody2D>();
        animE = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        animE.SetInteger("stateE", stateE);
        CheckIfTimeToFire();
    }

    void CheckIfTimeToFire()
    {
        if (Time.time > nextFire)
        {
            animE.SetTrigger("Attack");
            nextFire = Time.time + fireRate;
        }
    }

    private void OnCollisionEnter2D(Collision2D other1)
    {
        PlayerController Hero1 = other1.gameObject.GetComponent<PlayerController>(); //to understand Hero direction
        if (other1.gameObject.tag == "Hero") //if Enemy collids with Hero
        {
            if (Hero1.CurrStateH == 3) //if hero is falling
            {
                Die(); //kill enemy
            }

        }
    }


    public void Die() //activities to do before death
    {
        this.GetComponent<BoxCollider2D>().enabled = false;
        animE.SetTrigger("Death");
        print("die wiz");

    }
    void throwFB() //create fireball
    {
        Instantiate(fireball, LaunchOffset.position, Quaternion.identity);
    }

    private void Death() //destroy object
    {
        Destroy(this.gameObject);
    }

    public void Reset()
    {
        animE.SetTrigger("Death");
    }


}
