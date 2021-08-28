using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
public class EnemyFire : MonoBehaviour
{
    [SerializeField] public bool Alive;
    private Rigidbody2D rbE;
    private Animator animE;
    private enum State { idle, running, attack, dead }
    private State stateE = State.idle;
    // private Collider2D collE;
    [SerializeField] private LayerMask ground;
    [SerializeField] private float speedE = 3;
    [SerializeField] private float LimR = 0;
    [SerializeField] private float LimL = 1000;

    private float stepR;
    private float stepL;
    private int DirecE;
    private int DirecH;

    private void Start()
    {
        transform.localScale = new Vector2(-1, 1);
        // step = Lim;
        rbE = GetComponent<Rigidbody2D>();

        animE = GetComponent<Animator>();
        //  collE = GetComponent<Collider2D>();
        stepR = LimR = 0;
        stepL = LimL;

    }

    private void Update()
    {
        // if (state != State.hurt)
        // {
        MovementE();
        // }
        // VelocitySwitchE();
        // print(stateE);
        animE.SetInteger("stateE", (int)stateE); //set animation state
                                                 // print("state is " + stateE);
    }

    private void MovementE() //AI to control the movemnet tof the enemy
    {
        if (LimR < (LimL / 4))
        {
            stateE = State.running;
            DirecE = -1; //indicates EnemyMan is moving Right 
            rbE.velocity = new Vector2(speedE, rbE.velocity.y);
            transform.localScale = new Vector2(-1, 1);
            LimR = LimR + 1;
        }
        else if (LimR >= (LimL / 4) && LimR < (LimL / 2))
        {
            stateE = State.idle;
            LimR = LimR + 1;
        }
        else if (LimR >= (LimL / 2) && LimR < (LimL - (LimL / 4)))
        {
            stateE = State.running;
            DirecE = 1; //indicates EnemyMan is moving Left
            rbE.velocity = new Vector2(-speedE, rbE.velocity.y);
            transform.localScale = new Vector2(1, 1);
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
            /***** Attacking In The Correct Direction*******/
            if (Hero.CurrStateH != 0) //while hero is not idle
            {
                if (Hero.HeroDirec == 1) //if abu moving right
                {
                    print("abu right");

                    if (DirecE == 1) //if enamy also moving right
                    {
                        print("turlLeft");
                        TurnRight(); // turn left to face Abu
                    }
                    ReadyToAttackR(); //Attack left side
                }
                else if (Hero.HeroDirec == -1) //if abu moving left
                {
                    print("abu left");

                    if (DirecE == -1) // enemy also moving left
                    {
                        print("turlRight");

                        TurnLeft(); // turn right to face abu
                    }
                    ReadyToAttackL(); // attack right side
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
        LimR = (LimL / 4); // go to idle state in movemnet and then run towards abu
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

    public void Die() //things to do when enemy dies
    {
        this.GetComponent<BoxCollider2D>().enabled = false;
        rbE.velocity = Vector3.zero;
        stateE = State.dead;
        animE.SetTrigger("Death");

    }

    private void Death() // called as part of animation end
    {
        Destroy(this.gameObject); //destroy the enemy object
    }

}


