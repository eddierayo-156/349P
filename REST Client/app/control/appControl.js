function goDetails(id) {
	console.log('Calling goDetails function ...' + id)
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `http://localhost:3000/api/test/${id}`)
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			const context = this.response
			const xhr1 = new XMLHttpRequest()
			xhr1.open('GET', 'http://localhost:4020/workoutDetails.tbs')    
			xhr1.responseType = 'text'
			xhr1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					const body = document.getElementsByTagName('body')[0]
					console.log(this.response)
					const template = Handlebars.compile(this.response)
					// console.log('Before: ' + context[0].dob)
					// context[0].dob = context[0].dob.substring(0, 10)
					// console.log('After: ' + context[0].dob)
					const html = template(context[0]) 
					console.log(html) 
					body.innerHTML = html 					
				}
			}	
			xhr1.send()
		}
	}
	xhr.send()
}

document.getElementById('workoutList').addEventListener('click', function(event){
	// href = '/view-item.html'
	event.preventDefault()
	console.log('workoutList link clicked')
const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/test')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        const context = {test: this.response}
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = '' 
        // Handlebars implementation
        const xhr1 = new XMLHttpRequest()
        xhr1.open('GET', 'http://localhost:4020/workoutList.tbs')
        xhr1.responseType = 'text'
        xhr1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const tFile = this.response
                const template = Handlebars.compile(tFile)
                const html = template(context)
                body.innerHTML = html 
                // Add Event Listener to links 
                const links = document.getElementsByTagName('a')
                for (const l of links) {
                    l.addEventListener('click', function(event) {
                        event.preventDefault()
                        console.log(event.target.innerText)
                        goDetails(event.target.innerText)
                    })
                }
            }
        }
        xhr1.send()
    }
}
xhr.send()
})




function deleteWorkout(id) {

	// const objId = prompt('Enter the Item ID you wish to delete: ')
	console.log('Calling deleteWorkout function ...' + id)
	const xhr = new XMLHttpRequest()
	xhr.open('PUT', `http://localhost:3000/api/test/${id}`)
	const newValues = {id : id}

	// JSON encoding 
	const jsonStr = JSON.stringify(newValues)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			
		}
	}
	xhr.send(jsonStr)
    // add pop up message saying it was deleted then refresh
    alert(`Workout was deleted!`)
    history.go(0)
}

document.getElementById('deleteList').addEventListener('click', function(event){
	// href = '/view-item.html'
	event.preventDefault()
	console.log('deleteList link clicked')
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:3000/api/test')
    xhr.responseType = 'json'
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            const context = {test: this.response}
            const body = document.getElementsByTagName('body')[0]
            body.innerHTML = '' 
            // Handlebars implementation
            const xhr1 = new XMLHttpRequest()
            xhr1.open('GET', 'http://localhost:4020/workoutList.tbs')
            xhr1.responseType = 'text'
            xhr1.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const tFile = this.response
                    const template = Handlebars.compile(tFile)
                    const html = template(context)
                    body.innerHTML = html 
                    // Add Event Listener to links 
                    const links = document.getElementsByTagName('a')
                    for (const l of links) {
                        l.addEventListener('click', function(event) {
                            event.preventDefault()
                            console.log(event.target.innerText)
                            deleteWorkout(event.target.innerText)
                        })
                    }
                }
            }
            xhr1.send()
        }
    }
    xhr.send()
})
