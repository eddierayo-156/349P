
import {Workout} from '/workout.js'

function createMoreInputs(ns, ss, rs) {
	
	// Prepare data
	const ops = new Array()
	const cnt = ns.length
	for (let c=0; c<cnt; c++) {
		ops.push({name:ns[c].value, sets:ss[c].value, reps:rs[c].value}) 
	}
	const context = {options: ops}
	
	// Get the template
	const xhr1 = new XMLHttpRequest()
	xhr1.open('GET', 'http://localhost:4020/dropdown.tbs')
	xhr1.responseType = 'text'
	xhr1.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const body = document.getElementsByTagName('body')[0]
			//console.log(this.response)
			const template = Handlebars.compile(this.response)
			const html = template(context) 
			//console.log(html) 
			body.innerHTML = html 					
		}
	}	
	xhr1.send()				
}

document.getElementById('showOptions').addEventListener('click', function(event){
	event.preventDefault()	
	const noOptions = document.getElementById('noOptions').value
	const body  = document.getElementsByTagName('body')[0]
	const names = new Array()
	const sets  = new Array()
	const reps  = new Array()

	// Display the controls 
	for (let i=0; i<noOptions; i++) {
		body.appendChild(document.createElement('br'))
		let lb = document.createElement('label')
		lb.innerText = `Option ${i+1} : `
		body.appendChild(lb)
		body.appendChild(document.createElement('br'))
		lb = document.createElement('label')
		lb.innerText = `Name: `
		body.appendChild(lb)
		let ip = document.createElement('input')
		ip.type = 'text'
		names.push(ip) 
		body.appendChild(ip)
		lb = document.createElement('label')
		lb.innerText = `Sets: `
		body.appendChild(lb)
		ip = document.createElement('input')
		ip.type = 'text'
		sets.push(ip) 
		body.appendChild(ip)
		lb = document.createElement('label')
		lb.innerText = `Reps: `
		body.appendChild(lb)
		ip = document.createElement('input')
		ip.type = 'text'
		reps.push(ip) 
		body.appendChild(ip)		
	}
	body.appendChild(document.createElement('br'))
	// Add 'CREATE' button
	const btn = document.createElement('button')
	btn.innerText = 'CREATE'
	btn.addEventListener('click', function(event){
		//console.log(names)
		//console.log(values) 
		createMoreInputs(names, sets, reps) 
	})
	body.appendChild(btn)
})



document.getElementById('create').addEventListener('click', function(event){
	console.log('The Create button was clicked...')
	const title = document.getElementById('title').value
	const type = document.getElementById('type').value
	const name = document.getElementById('workoutName').value
	const sets = document.getElementById('sets').value
	const reps = document.getElementById('reps').value
	const time = document.getElementById('time').value

	console.log('Sending REST request to save object ...')
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/test')
	// xhr.open('POST', `http://localhost:3000/api/${title}`)
	const stObj = new Workout(title, type, name, sets, reps, time)

	console.log(`Title: ${title}`)
	// Set the Content-Type 
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			window.location.href = 'http://localhost:4020/'
		}
	}
	// JSON encoding 
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)

})
