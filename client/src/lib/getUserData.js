async function getUserData() {
    try {
        const response = await fetch('http://localhost:3000/dashboard/', {
            method: "GET",
            headers: { token: localStorage.token }
        })

        const parseResponse = await response.json()
        console.log(parseResponse);
        // setName(parseResponse.user.f_name)
        // setTrip(parseResponse.trip)

    } catch (err) {
        console.error(err.message)
    }
}

export default getUserData;