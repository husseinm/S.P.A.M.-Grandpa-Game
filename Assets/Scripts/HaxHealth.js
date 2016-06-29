#pragma strict

public var width : int;
public var height : int;

private var xPos : int;
private var yPos : int;
private var initialWidth = Screen.width;
private var initialHeight = Screen.height;
private var padding = 25;
private var yOffset = 150;

var lives : int;
 var maxLives : int;
var mainCamera : GameObject;
var heartTexture : Texture;

function Start() {
	xPos = (Screen.width / 2) - (width / 2);
	yPos = ((Screen.height / 2) + height) + 75;
}

function Update() {
	if (initialWidth != Screen.width || initialHeight != Screen.height) {
		xPos = (Screen.width / 2) - (width / 2);
		yPos = (Screen.height / 2) - height + yOffset;
		initialWidth = Screen.width;
		initialHeight = Screen.height;
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
		GUI.DrawTexture(Rect(10 + (i * 50), 10, 50, 50), heartTexture, ScaleMode.ScaleToFit, true, 1);
	}
	
	if (lives <= 0) {
    Application.LoadLevel("Title");
	}
}
