#pragma strict
import System.IO;


public var width : int;
public var height : int;
public var labelStyle : GUISkin;
private var xPos : int;
private var yPos : int;
private var initialWidth = Screen.width;
private var initialHeight = Screen.height;
private var padding = 25;
private var yOffset = 150;
private var currentPos : int = 0;
private var genderSelect = false;
private var konamiCode = ["DownArrow", "DownArrow", "UpArrow", "UpArrow", "RightArrow", "LeftArrow", "RightArrow", "LeftArrow", "A", "B", "Return"];
private var inKonami : boolean = false;
private var highScores = new Array();

function Start() {
	xPos = (Screen.width / 2) - (width / 2);
	yPos = (Screen.height / 2) - height + yOffset;   
	ReadScoresFromFile();
}

function Update() {
	if (initialWidth != Screen.width || initialHeight != Screen.height) {
		xPos = (Screen.width / 2) - (width / 2);
		yPos = (Screen.height / 2) - height + yOffset;
		initialWidth = Screen.width;
		initialHeight = Screen.height;
	}

  if (inKonami) {
	Application.LoadLevel("Hax");
  }
}
 
function konamiFunction (incomingKey) {
    var incomingKeyString = incomingKey.ToString();
    if(incomingKeyString == konamiCode[currentPos]) {
       currentPos++;
 
       if ((currentPos + 1) > konamiCode.length) {
         inKonami = true;
         currentPos = 0;
       }
    } else {
       currentPos = 0;
    }
}

function ReadScoresFromFile() {
	var text = "";
 	var tempHighScores = new Array();
	var reader =  new StreamReader(Application.persistentDataPath + "/Scores.dat");
 
    for (var it = 0; it < 19; it += 2) {
		text = reader.ReadLine();
 		tempHighScores = text.Split(", "[0]);
 		
 		highScores.push(tempHighScores[0]);
 		highScores.push(tempHighScores[1]);
    }
}

function OnGUI() {
	// Input
	if (GUI.Button(Rect(xPos, yPos, width, height), "Male")) {
		Application.LoadLevel("Main");
	}
	if (GUI.Button(Rect(xPos, (yPos + height + padding), width, height), "Female")) {
		Application.LoadLevel("MainSecondClass");
	}
	
	// Scores
	labelStyle.label.fontSize = 16;
	var defaultX = (Screen.width / 2) - 600.0f;
	var defaultY = (Screen.height / 2) - 100.0f;
	var teamName = true;
	var i = 0;
		
	GUI.Label(new Rect(75, defaultY - 100, Screen.width,
			  Screen.height), "Scores", labelStyle.label);
			 
	for (var data : String in highScores) {
		if (teamName) {
			GUI.Label(new Rect(15, defaultY - 50 + (i * 25),
					  Screen.width, Screen.height), (i + 1) + ". " + data,
					  labelStyle.label);
					  
			teamName = false;
		} else {
			GUI.Label(new Rect(135, defaultY - 50 + (i * 25),
					  Screen.width, Screen.height), data,
					  labelStyle.label);
		
			i++;
			teamName = true;
		}
	}
 
 	// Handle Konami
  	var e : Event = Event.current;
  	
  	if (e.isKey && Input.anyKeyDown && !inKonami && e.keyCode.ToString()!="None") {
   	  konamiFunction (e.keyCode);
  	}
}
