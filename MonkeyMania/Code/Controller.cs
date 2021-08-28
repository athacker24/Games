using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// used to transform Abus position
public class Controller : MonoBehaviour
{
    public Transform player;

    private void Update() //used to update Abu's direction
    {
        transform.position = new Vector3(player.position.x, player.position.y, transform.position.z);
    }
}