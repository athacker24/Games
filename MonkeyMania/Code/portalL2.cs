using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class portalL2 : MonoBehaviour
{
    [SerializeField] int x, y;
    [SerializeField] private string gameToLoad;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Hero")
        {
            //collision.gameObject.GetComponent<PlayerController>();
            collision.transform.position = new Vector3(x, y, 0);

        }
    }
}
