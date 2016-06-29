#pragma strict

var speed : float;

protected var paused = false;
private var maxX : Vector3;
private var maxY : Vector3;
private var originalHeight = Screen.height;
private var originalWidth = Screen.width;

function OnPauseGame() {
	paused = true;
}

function OnResumeGame() {
	paused = false;
}

function Start() {
	maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
	maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));
	
	transform.position = new Vector3(-maxX.x + 3, 0, 0);
}

function Update () {
	if (originalWidth != Screen.width || originalHeight != Screen.height) {
		maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
		maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));
		
		originalHeight = Screen.height;
		originalWidth = Screen.width;
	}
	
	if (!paused) {
			// Get current position
      		var newVector : Vector3 = Vector3.zero;	
	
			// Translate
			newVector.x = transform.position.x + Input.GetAxis("Horizontal") * 2.0f;
			newVector.y = transform.position.y + Input.GetAxis("Vertical") * 2.0f;
			
			// For phones
			if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) {
			  var finger = Input.GetTouch(0);
			  
              // Move object across XY plane
              newVector = Camera.main.ScreenToWorldPoint(finger.position);
              newVector.z = 0;
            }
	
			// Limiting
			if (newVector.x > maxX.x - 3) {
			  newVector.x = maxX.x - 3;
			} else if (newVector.x < -maxX.x + 3) {
			  newVector.x = -maxX.x + 3;
			}
		
			if (newVector.y > maxY.y - 1) {
			  newVector.y = maxY.y - 1;
			} else if (newVector.y < -maxY.y + 1) {
			  newVector.y = -maxY.y + 1;
			}
				
			transform.position = Vector3.Lerp(transform.position, newVector, Time.deltaTime * speed);
    }
}	
