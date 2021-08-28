using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//Script to control fireball movemnet of enemyWiz
public class FireBall : MonoBehaviour
{
    public float speed = 15f;
    private Rigidbody2D rb;
    private EnemyWiz Enemy;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        rb.velocity = new Vector2(-speed, 0);
        Destroy(gameObject, 5f);
    }

    void OnTriggerEnter2D(Collider2D col) //destroy fire ball if it hits any other object
    {
        if (col.gameObject.tag != "EnemyMan"  && col.gameObject.tag != "EnemyWiz" && col.gameObject.tag != "EnemyFire"  && col.gameObject.tag != "Projectile" && col.gameObject.tag != "Collectable")
        {
            if(col.gameObject.tag == "Hero")
            {
                PlayerController Hero = col.gameObject.GetComponent<PlayerController>();
                Hero.hurt(); //hurt Abu
                Destroy(gameObject);
            }
            Debug.Log("Hit!");
            Destroy(gameObject); // Destroy the fireball
        }
    }
}

