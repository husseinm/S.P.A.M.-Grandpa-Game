#pragma strict

var spawnOne : GameObject;
var spawnTwo : GameObject;
var spawnThree : GameObject;
var spawnFour : GameObject;
var spawnFive : GameObject;
var delay: float;
var frequency : float;

private var maxX : Vector3;
private var maxY : Vector3;
private var selectedCloud : GameObject;
private var originalHeight;
private var originalWidth;

InvokeRepeating("Spawn", delay, frequency);

function Start() {
	maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
	maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));

	transform.position = new Vector3(maxX.x + 1.5, 0, 0);
	var v3 = transform.position;
	v3.y = Random.Range(-maxY.y, maxY.y);
	Instantiate(spawnFive, v3, Quaternion.identity);
}

function Spawn() {
	if (originalWidth != Screen.width || originalHeight != Screen.height) {
		maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
		maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));
		
		originalHeight = Screen.height;
		originalWidth = Screen.width;
		transform.position = new Vector3(maxX.x + 1.5, 0, 0);
	}
	
	// Calculate the Enemy
	var score = Random.Range(0, 99);
		
	if (score > 80) {
		selectedCloud = spawnFive;
	} else if (score > 60) {
		selectedCloud = spawnFour;
	} else if (score > 40) {
		selectedCloud = spawnThree;
	} else if (score > 20) {
		selectedCloud = spawnTwo;
	} else if (score == 0) {
		selectedCloud = spawnOne;
	}
		
	// Calculate the Position
	var v3 = transform.position;
	v3.y = Random.Range(-maxY.y, maxY.y);
		
	Instantiate(selectedCloud, v3, Quaternion.identity);
}