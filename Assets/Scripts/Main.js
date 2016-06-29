#pragma strict

var labelStyle : GUISkin;
var grandpaSong : AudioClip;
private var paused = false;
private var wasHeld = false;
private var grandpaMode = false;
private var accelerated = false;
private var grandpaStart = 0.0f;
private var elapsedGrandpa = 0.0f;
private var lastTime = 0.0f;
private var charLives = 0;

function UpdateLives(lives : int) {
  charLives = lives;
}

function OnPauseGame() {
	audio.Pause();
}

function OnResumeGame() {
	audio.Play(0);
  grandpaStart = Time.time - elapsedGrandpa;
}

function Start() {
	lastTime = Time.time;
}

function GrandpaMode(timeStart : float) {
  if (grandpaMode) {
    if (accelerated) {
      Time.timeScale /= 1.5;
      accelerated = false;
    }
  } else {
    grandpaMode = true;
  }
  
  grandpaStart = Time.time;
  audio.clip = grandpaSong;
  audio.time = 0;
  audio.Play();
}

function Update() {
	if (charLives > -1) {
    if (grandpaMode) {
      if (!paused) {
        elapsedGrandpa = (Time.time - grandpaStart) / Time.timeScale;
      }

      if (elapsedGrandpa < 16) {
        if (elapsedGrandpa >= 2) {
          if (!accelerated) {
            Time.timeScale *= 1.5;
            accelerated = true;
          }
        }
      } else {
        grandpaMode = false;
        accelerated = false;
        Time.timeScale /= 1.5;
        audio.Pause();
        audio.Play(0);
      }
    }

		if (!wasHeld) {
			if (Input.GetKey(KeyCode.Space)) {
				var objects = FindObjectsOfType(typeof(GameObject));
				paused = !paused;
				wasHeld = true;
			
				if (paused) {
					for (object in objects) {
						object.SendMessage("OnPauseGame", SendMessageOptions.DontRequireReceiver);
					}	
				} else {
					for (object in objects) {
						object.SendMessage("OnResumeGame", SendMessageOptions.DontRequireReceiver);
					}
				}
			}
		} else {
			if (!Input.GetKey(KeyCode.Space)) {
				wasHeld = false;
			}
		}
	} else {
    // Play Death Music
  }
}

function OnGUI() {
	if (paused) {
		labelStyle.label.fontSize = 64;
		
		GUI.Label(new Rect((Screen.width / 2) - 175, Screen.height / 2 - 100, Screen.width, Screen.height), "PAUSED", labelStyle.label);
	}
}
