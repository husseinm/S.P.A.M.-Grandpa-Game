#pragma strict

var labelStyle : GUISkin;
var mainChar : GameObject;
private var startTime = 0.0f;
private var elapsedTime = 0.0f;
private var newSpeed = 0.0f;

protected var paused = false;

function OnPauseGame() {
	paused = true;
}

function OnResumeGame() {
	paused = false;
	startTime = Time.time - elapsedTime;
}

function Start () {
	startTime = Time.time;
}

function Update () {
	if (!paused) {
      elapsedTime += Time.deltaTime;
	    newSpeed = (elapsedTime * .02) + 1;	

   	 	if (!(newSpeed >= 2.5)) {
   	 		//if (!(Time.timeScale >= 2.0)) {
   	   			Time.timeScale = newSpeed;
   	   		//}
   	 	}
	} else {
		mainChar.SendMessage("UpdateTime", elapsedTime);
	}
}

function OnGUI() {
	labelStyle.label.fontSize = 16;
	GUI.Label(new Rect(Screen.width / 2 - 30, 10, Screen.width, Screen.height), (elapsedTime.ToString()), labelStyle.label);
}
