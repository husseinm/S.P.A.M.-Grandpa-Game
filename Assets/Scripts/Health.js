#pragma strict

public var width : int;
public var height : int;

private var xPos : int;
private var yPos : int;
private var initialWidth = Screen.width;
private var initialHeight = Screen.height;
private var padding = 25;
private var yOffset = 150;
private var highScores = new Array();
private var teamName = "Team #";
private var nameIsReady = false;
private var highScore = false;
private var size = 0;
private var frame = 120;
private var score = 0.0f;
private var highIndex = 0;

var labelStyle : GUISkin;
var lives : int;
var maxLives : int;
var mainCamera : GameObject;
var heartTexture : Texture;

function UpdateTime(time : float) {
	score = time;
}

function ReadScoresFromFile() {
	if (!System.IO.File.Exists(Application.persistentDataPath + "/Scores.dat")) {
		for (var iterator = 0; iterator < 20; iterator++) {
			highScores.push(0.0f);
		}
	} else {
		var text = "";
 		var tempHighScores = new Array();
		var reader =  new StreamReader(Application.persistentDataPath + "/Scores.dat");
 
	    for (var it = 0; it < 20; it += 2) {
			text = reader.ReadLine();
 			tempHighScores = text.Split(", "[0]);
 		
 			highScores.push(tempHighScores[0].ToString());
 			size++;
 			highScores.push(float.Parse(tempHighScores[1].ToString()));
 			size++;
    	}
    	
    	reader.Close();
    }
}

function WriteScoresToFile(scores : Array) {
	var writer = new StreamWriter(Application.persistentDataPath + "/Scores.dat");
	var name = true;
	var file = "";
	
	for (var data in scores) {
		if (name) {
			file += data + ", ";
			name = false;
		} else {
			file += data.ToString();
			name = true;
			
			writer.WriteLine(file);
			file = "";
		}
	}
	
	writer.Close();
}

function Start() {
	xPos = (Screen.width / 2) - (width / 2);
	yPos = ((Screen.height / 2) + height) + 75;
	
	ReadScoresFromFile();
}

function Update() {
	if (initialWidth != Screen.width || initialHeight != Screen.height) {
		xPos = (Screen.width / 2) - (width / 2);
		yPos = (Screen.height / 2) - height + yOffset;
		initialWidth = Screen.width;
		initialHeight = Screen.height;
	}
	
	// Create sorted from file
	if (lives <= 0) {
   		var record : float = 0.0f;
		var name = true;

		for (var i = 0; i < size; i++) { 
    		if (name) {
    			if (highScore) {    	
    				if (nameIsReady) {
    					highScores[highIndex] = teamName;
    					name = false;
    				} else {
    					name = true;
    				}
    			} else {
    			    name = false;
    			}
    		} else {
    			float.TryParse(highScores[i].ToString(), record);

				if (!highScore) {
    				if (score > record) {
    					highScore = true;
    					highIndex = i - 1;
    					var tempArray = highScores.slice(0, size);
    					
    					for (var it = i - 1; it < size; it++) {
    						if (highIndex >= 19) {
    							break;
    						}
    						
    						highScores[it + 2] = tempArray[it];
    					}
    					
    					
    					highScores[i] = score;
    				}
    			}
    		
    			name = true;
    		} 
    	}
   	 	if (frame >= 60) {
    		WriteScoresToFile(highScores);
    	}
    	frame++; 
    }
}

function OnPauseGame() {
	audio.Pause();
}

function OnResumeGame() {
	audio.Play(0);
}

function lowerHealth() {
	lives--;
	// Decrease Hearts
	if (lives <= 0) {
		var objects = FindObjectsOfType(typeof(GameObject));
		
		for (object in objects) {
			object.SendMessage("OnPauseGame", SendMessageOptions.DontRequireReceiver);
		}
		
    	Time.timeScale = 1.0;		
		return false;
	}
	
	return true;
}

function OnTriggerEnter2D(other : Collider2D) {
	if (other.gameObject.CompareTag("Enemy")) {
		if (lowerHealth()) {
			Destroy(other.gameObject);
		}
		mainCamera.SendMessage("UpdateLives", lives);
	} else if (other.gameObject.CompareTag("PowerUp")) {
		lives++;

		if (lives > maxLives) {
			lives = maxLives;
		}
		Destroy(other.gameObject);
		mainCamera.SendMessage("UpdateLives", lives);
	} else if (other.gameObject.CompareTag("Grandpa")) {
    	mainCamera.SendMessage("GrandpaMode", Time.time);
    	audio.Pause();
    	Destroy(other.gameObject);
	}
}

function OnGUI() {
	for (var i = 0; i < lives; i ++) {
		GUI.DrawTexture(Rect(10 + (i * 	55), 10, 50, 50), heartTexture, ScaleMode.ScaleToFit, true, 1);
	}
	
	if (lives <= 0) {
		// Play Death Audio
		labelStyle.label.fontSize = 64;
		var tempName : int;
		
		if (!nameIsReady && highScore) {
			GUI.Label(new Rect(xPos, yPos - 250, width, height * 2), "High Score!", labelStyle.label);
			
			GUI.SetNextControlName("NumberInput");
			teamName = GUI.TextField(Rect(xPos, yPos - 100, width, height), teamName, labelStyle.textField);
			int.TryParse(teamName, tempName);
			
			if (GUI.GetNameOfFocusedControl () == "NumberInput") {
				if (teamName == "Team #") {
					teamName = "";
				}
			}
			
			if (GUI.Button(new Rect(xPos, yPos, width, height), "Submit")) {
				if (tempName > 0) {
					nameIsReady = true;
				}
			}
		} else {
			GUI.Label(new Rect(xPos + 30, yPos - 350, width, height + 100), "Try Again!", labelStyle.label);
			if (GUI.Button(Rect(xPos, yPos - 200, width, height), "Main Menu")) {
				Application.LoadLevel("Title");
			}
			if (GUI.Button(Rect(xPos, yPos + padding + height - 200, width, height), "Play Again")) {
				Application.LoadLevel(Application.loadedLevel);
			}
		}
	}
}
