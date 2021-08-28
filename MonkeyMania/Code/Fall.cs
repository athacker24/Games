using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
// check if Player is falling and accordingly reset position to start
public class Fall : MonoBehaviour
{
    //[SerializeField] private string gameToLoad;
    public int check;

    private void Start()
    {
        check = 0;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.tag == "Hero")
        {
            //check level name and accordingly assign coordinates for restart
            if (SceneManager.GetActiveScene().name == "Level2")  //lvl2
            {
                collision.transform.position = new Vector3(-67, 67, 0);
                check++;
            }
            else if (SceneManager.GetActiveScene().name == "Level3Part1")
            {
                collision.transform.position = new Vector3(-58, 2, 0);
                check++;

            }
            else if (SceneManager.GetActiveScene().name == "Level3Part2")
            {
                collision.transform.position = new Vector3(-6, -30, 0);
                check++ ;

            }
            else  //lvl1
            {
                collision.transform.position = new Vector3(-85, 1, 0);
            }
        }
    }
}
