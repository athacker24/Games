using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
//Special scene updater for only levels page. Active levels depends on previously compleded levels
public class test : MonoBehaviour
{
    public GameObject CheckLvl1, CheckLvl2, CheckLvl3 , BlockLvl1, BlockLvl2, BlockLvl3;
    public void check(string CheckScene)
    {
        if (CheckScene == "MonkeyMania2.0") //level 1 completer
        {
            CheckLvl1.SetActive(true);
            LoadScene(CheckScene);
        }
        else if (CheckScene == "Level2" && PlayerPrefs.GetInt("CheckLvl2") == 1) //level 2 complete
        {
            print("CheckPlayerprefs status  " + PlayerPrefs.GetInt("CheckLvl1"));

            BlockLvl2.SetActive(false);
            CheckLvl2.SetActive(true);
            LoadScene(CheckScene);

        }
        else if (CheckScene == "Level3Part1" && PlayerPrefs.GetInt("CheckLvl3") == 1) // activate lvl 3
        {
            BlockLvl3.SetActive(false);
            CheckLvl2.SetActive(true);
            LoadScene(CheckScene);

        }
    }


    public void LoadScene(string Scene) // load scene
    {
        if (Scene == "Level2" || Scene == "Level3Part1" || Scene == "MonkeyMania2,0")
        {
            PlayerPrefs.DeleteKey("GemsLoad");
        }

        SceneManager.LoadScene(Scene);
    }
    public void QuitApp() // quit game
    {
        PlayerPrefs.SetInt("CheckLvl1",0);
        PlayerPrefs.SetInt("CheckLvl2", 0);
        PlayerPrefs.SetInt("CheckLvl3", 0);

        print("CheckPlayerprefs Quit status  " + PlayerPrefs.GetInt("CheckLvl1"));
        print("Quitting");
        Application.Quit();

    }
}
