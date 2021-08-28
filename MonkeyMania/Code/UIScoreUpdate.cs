using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

//UI score updator to display updated info to UI
public class UIScoreUpdate : MonoBehaviour
{
    public GameObject NextLvlCheck;
    public GameObject LevelFail;
    bool pass = false;
    // Start is called before the first frame update
    void Start()
    {
        //print("Check :" + PlayerPrefs.GetInt("CheckMonkeyMania2.0"));

    }

    // Update is called once per frame
    void Update()
    {
        string LvlName = PlayerController.PreviousLevel;
        GetComponent<Text>().color = new Color(254/255f, 174/255f, 52/255f, 1f);
        GetComponent<Text>().text = ""   + PlayerPrefs.GetInt("GemsLoad", 0);
        if (PlayerPrefs.GetInt("GemsLoad") > 28) //minimum req for any lvl to complete
        {
            if (LvlName == "MonkeyMania2.0" && PlayerPrefs.GetInt("GemsLoad") >= 28)//minimum req for any lvl 1
            {
                pass = true;
                PlayerPrefs.SetInt("CheckLvl1", 1);
                PlayerPrefs.SetInt("CheckLvl2", 1);
            }
            else if (LvlName == "Level2" && PlayerPrefs.GetInt("GemsLoad") >= 56)//minimum req for any lvl 2
            {
                pass = true;
                PlayerPrefs.SetInt("CheckLvl1", 1);
                PlayerPrefs.SetInt("CheckLvl2", 1);
                PlayerPrefs.SetInt("CheckLvl3", 1);
            }
            else if (LvlName == "Level3Part3" && PlayerPrefs.GetInt("GemsLoad") >= 1)
            {
                pass = true;
                PlayerPrefs.SetInt("CheckLvl3", 1);
            }
            else
            {
                NextLvlCheck.SetActive(false);
                LevelFail.SetActive(true);
                pass = false;
            }
        }
        else  //lvl fail
        {
            LevelFail.SetActive(true);
            NextLvlCheck.SetActive(false);
            pass = false;
        }
    }
}
