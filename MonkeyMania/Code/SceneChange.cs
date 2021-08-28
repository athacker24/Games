using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
//Used to jump between scenes depending on the previous scene
public class SceneChange : MonoBehaviour
{
    [SerializeField] private string SceneName;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Hero")
        {

            if (SceneName == "Level2" || SceneName == "Level3Part1" || SceneName == "MonkeyMania2,0")
            {
                PlayerPrefs.SetInt("GemsLoad", 0);
            }
            if (SceneName == "EndL3" || SceneName == "EndL2" || SceneName == "EndL1")
            {
                print("entering        " + PlayerPrefs.GetInt("GemsLoad"));

            }
            SceneManager.LoadScene(SceneName); // laod appropriate scene passed as variable
        }

    }
}