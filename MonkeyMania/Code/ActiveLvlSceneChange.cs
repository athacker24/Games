using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
//Used to select the next scene to load.
public class ActiveLvlSceneChanger : MonoBehaviour
{
    [SerializeField] private string SceneName;

    private void OnTriggerEnter2D(Collider2D collision) //pick the correct scene depending on the colliding object.
    {
        if (collision.gameObject.tag == "Hero")
        {

            if (SceneName == "Level2" || SceneName == "Level3Part1" || SceneName == "MonkeyMania2,0") //checking scene name
            {
                PlayerPrefs.SetInt("GemsLoad", 0);
            }
            if (SceneName == "EndL3" || SceneName == "EndL2" || SceneName == "EndL1")
            {
                print("entering        " + PlayerPrefs.GetInt("GemsLoad"));

            }
            SceneManager.LoadScene(SceneName);
        }

    }
}

