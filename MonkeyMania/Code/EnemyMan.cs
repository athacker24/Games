using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
//script to control Enemy Man
public class EnemyMan : MonoBehaviour
{

    private Rigidbody2D rbE;
    private Animator animE;
    private enum State { idle, running, attack, dead }
    private State stateE = State.idle;
   // private Collider2D collE;
    [SerializeField] private LayerMask ground;
    [SerializeField] private float speedE = 3;
    [SerializeField] private float LimR = 0;
    [SerializeField] private float LimL = 100;

    private float stepR;
    private float stepL;
    private int DirecE;
    private int DirecH;

    private void Start()
    {
        rbE = GetComponent<Rigidbody2D>();
        animE = GetComponent<Animator>();
        stepR = LimR = 0;
        stepL = LimL;

    }

    private void Update()
    {
        MovementE();
        animE.SetInteger("stateE", (int)stateE); //set animation state
    }

    private void MovementE()
    { 
        if (LimR < (LimL/4))
        {
            stateE = State.running;
            DirecE = 1; //indicates EnemyMan is moving Right 
            rbE.velocity = new Vector2(speedE, rbE.velocity.y);
            transform.localScale = new Vector2(1, 1);
            LimR = LimR + 1;            
        }
        else if(LimR >= (LimL/4) && LimR < (LimL/2))
        {
            stateE = State.idle;
            LimR = LimR +1 ;
        }
        else if (LimR >= (LimL/2) && LimR < (LimL-(LimL/4)))
        {
            stateE = State.running;
            DirecE = -1; //indicates EnemyMan is moving Left
            rbE.velocity = new Vector2(-speedE, rbE.velocity.y);
            transform.localScale = new Vector2(-1, 1);
            LimR = LimR + 1;

        }
        else if (LimR >= (LimL - (LimL / 4)) && LimR < LimL)
        {
            stateE = State.idle;
            LimR = LimR + 1;
        }
        else
        {
            LimR = 0;
        }
    }

    private void OnTriggerEnter2D(Collider2D other1)
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

    private void OnCollisionEnter2D(Collision2D other) //Enemy AI(attack or Die)
    {
        PlayerController Hero = other.gameObject.GetComponent<PlayerController>(); //to understand Hero direction
        if (other.gameObject.tag == "Hero") //if Enemy collids with Hero
        {
            if (Hero.CurrStateH == 3) //if hero is falling
            {
                Die(); //kill enemy
            }
            if (Hero.CurrStateH != 0) //while hero is not idle
            {
                if (Hero.HeroDirec == 1) //if abu moving right
                {
                    if (DirecE == 1) //if enamy also moving right
                    {
                        TurnLeft(); // turn left to face Abu
                    }
                    ReadyToAttackL(); //Attack left side
                }
                else if(Hero.HeroDirec == -1) //if abu moving left
                {
                    if (DirecE == -1) // enemy also moving left
                    {
                        TurnRight(); // turn right to face abu
                    }
                    ReadyToAttackR(); // attack right side
                }
            }
            else if (DirecE == 1) // is abu is idle and enemy moving right
            {
                ReadyToAttackR();
            }
            else if (DirecE == -1) // is abu is idle and enemy moving left
            {
                ReadyToAttackL();
            }
        }
    }

    private void TurnRight() //turn right before attacking
    {
        transform.localScale = new Vector2(1, 1);
        animE.SetTrigger("Attack");
        LimR = LimL - (LimL / 4); // go to idle state in movemnet and then run towards abu
    }

    private void TurnLeft() //turn right before attacking
    {
        transform.localScale = new Vector2(-1, 1);
        animE.SetTrigger("Attack");
        LimR = (LimL/4); // go to idle state in movemnet and then run towards abu
    }

    private void ReadyToAttackR()
    {
        animE.SetTrigger("Attack");
        LimR = LimL - (LimL / 4); // go to idle state in movemnet and then run towards abu
    }

    private void ReadyToAttackL()
    {
        animE.SetTrigger("Attack");
        LimR = (LimL / 4); // go to idle state in movemnet and then run towards abu
    }

    public void Die()
    {
        rbE.velocity = Vector3.zero;
        stateE = State.dead;
        animE.SetTrigger("Death");
        this.GetComponent<BoxCollider2D>().enabled = false;
        
        
    }

    private void Death() //Destroy game object
    {
        rbE.velocity = Vector3.zero;
        Destroy(this.gameObject);
    }

}


