using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//script to control gravity in the scene
public class GravityHelper : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.tag == "Hero")
        {
            collision.gameObject.GetComponent<PlayerController>().enabled = false; //set collider to false if trigger is entered
        }
    }
}
