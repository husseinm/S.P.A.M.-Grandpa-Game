#pragma strict

var onePercentSpawn : GameObject;
var tenPercentSpawn : GameObject;
var fourteenPercentSpawn : GameObject;
var twentyFivePercentSpawn : GameObject;
var fiftyPercentSpawn : GameObject;
var delay: float;
var frequency : float;

private var selectedEnemy : GameObject;
private var maxX : Vector3;
private var maxY : Vector3;
private var originalHeight;
private var originalWidth;

InvokeRepeating("Spawn", delay, frequency);

private var paused = false;
private var cheatersHell = 0;

function OnPauseGame() {
	paused = true;
}

function OnResumeGame() {
	paused = false;
}

function Start() {
	maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
	maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));
	
	transform.position = new Vector3(maxX.x + 5, 0, 0);
}

function Spawn() {
	if (originalWidth != Screen.width || originalHeight != Screen.height) {
		maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
		maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));
		
		originalHeight = Screen.height;
		originalWidth = Screen.width;
		transform.position = new Vector3(maxX.x + 5, 0, 0);
	}
	
	if (!paused) {
		// Calculate the Enemy
		var score = Random.Range(0, 99);
		
		if (score > 49) {
			selectedEnemy = fiftyPercentSpawn;
		} else if (score > 30) {
			selectedEnemy = twentyFivePercentSpawn;
		} else if (score > 13) {
			selectedEnemy = fourteenPercentSpawn;
		} else if (score > 9) {
			selectedEnemy = tenPercentSpawn;
		} else if (score == 0) {
			selectedEnemy = onePercentSpawn;
		}
		
		if (Time.timeScale <= 2.0 && selectedEnemy == onePercentSpawn) {
		  selectedEnemy = tenPercentSpawn;
		}
		
		// Screw Cheaters
		var v3 = transform.position;

		if (cheatersHell > 2) {
			if (Random.Range(0, 1)) {
				v3.y = -maxY.y;
			} else {
				v3.y = maxY.y;
			}
			
			cheatersHell = 0;
			Instantiate(fiftyPercentSpawn, v3, Quaternion.identity);
			
			v3.y = 0;
			Instantiate(fiftyPercentSpawn, v3, Quaternion.identity);
		} else {
			cheatersHell++;
		}
		
		// Calculate the Position
		v3.y = Random.Range(-maxY.y, maxY.y);

		Instantiate(selectedEnemy, v3, Quaternion.identity);
	}
}
