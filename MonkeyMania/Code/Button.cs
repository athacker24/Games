using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
// Script to assign button functions
public class Button : MonoBehaviour
{
    private void Start() // Resume game
    {
        Time.timeScale = 1;

    }
    public void LoadScene(string Scene) //clear player prefs 
    {
        if (Scene == "Level2" || Scene == "Level3Part1" || Scene == "MonkeyMania2,0")
        {
            PlayerPrefs.DeleteKey("GemsLoad"); //delete gems entry from player prefs
        }

        SceneManager.LoadScene(Scene);
    }
    public void QuitApp() //on selecting quit, all stored data will be cleared.
    {
        PlayerPrefs.SetInt("CheckLvl1", 0);
        PlayerPrefs.SetInt("CheckLvl2", 0);
        PlayerPrefs.SetInt("CheckLvl3", 0);
        print("CheckPlayerprefs Quit status  " + PlayerPrefs.GetInt("CheckLvl1"));
        print("Quitting");
        Application.Quit(); //quit app
    }
}
