using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
//Script for Abu to throw Rocks as an upgrade for A3
public class Throwable : MonoBehaviour
{
    public float speed = 20f;
    public float TTL = 3;
    private Rigidbody2D rb;
    Scene SceneName;

    void Start()
    {
        SceneName = SceneManager.GetActiveScene();
        rb = GetComponent<Rigidbody2D>();
        rb.velocity = transform.right * speed;

    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "EnemyWiz")
        {
            EnemyWiz EnemyWiz = collision.gameObject.GetComponent<EnemyWiz>();
            print("killing Man");
            EnemyWiz.Reset();
            EnemyWiz.Die();
            Destroy(this.gameObject);
        }
        else if (collision.gameObject.tag == "EnemyMan")
        {
            EnemyMan EnemyMan = collision.gameObject.GetComponent<EnemyMan>();
                print("killing Man");
                EnemyMan.Die();
                Destroy(this.gameObject);
        }
        else if (collision.gameObject.tag == "EnemyFire")
        {
            EnemyFire EnemyFire = collision.gameObject.GetComponent<EnemyFire>();
            print("killing Man");
            EnemyFire.Die();
            Destroy(this.gameObject);
        }
    }

    private void Update()
    {
        Destroy(this.gameObject, TTL);

    }
}


