allClasses = document.getElementsByClassName("event-base-wrapper")
formattedClasses = []

// console.log(allClasses.length);
for (i = 0; i < allClasses.length; i++) {
    currClass = allClasses[i]
    // day code (2=mon ... 6=fri)
    day = currClass.getAttribute("style")
    day = day[day.indexOf(":") + 2]

    // title
    title = currClass.getElementsByClassName("ticket-body")[0].children[0].innerText

    // time
    time = currClass.getElementsByClassName("ticket-header")[0].children[0].innerText
    dash = time.indexOf("-")
    startTime = time.slice(0, dash - 1)
    endTime = time.slice(dash + 2)

    // type
    let type = 0
    if (currClass.getElementsByClassName("P").length != 0) {
        type = "lec"
    } else if (currClass.getElementsByClassName("C").length != 0) {
        type = "tut"
    } else if (currClass.getElementsByClassName("L").length != 0) {
        type = "lab"
    }

    // room
    room = currClass.getElementsByClassName("ticket-footer")[0].innerText
    
    // note
    note = ""
    if (currClass.getElementsByClassName("ticket-week")[0] != null) {
        note = currClass.getElementsByClassName("ticket-week")[0].innerText
        if (note == "SUDÝ") {
            note = "even"
        } else if (note == "LICHÝ") {
            note = "odd"
        }
    }

    formattedClasses[i] = {
        dayCode: day,
        title: title,
        startTime: startTime,
        endTime: endTime, 
        type: type,
        room: room,
        note: note
    }

}

formattedClasses.sort(function (a, b) {
    return a.dayCode - b.dayCode;
})

// create json
json = "["

for (i = 2; i <= 6; i++) {
    json += "["
    firstInDay = true
        for (j = 0; j < formattedClasses.length; j++) {
            curr = formattedClasses[j]
            if (curr.dayCode == i) {
                if (firstInDay) {
                    firstInDay = false
                } else {
                    json += ","
                }
                json += "{"
                json += atr("title", curr.title) + ","
                json += atr("startTime", curr.startTime) + ","
                json += atr("endTime", curr.endTime) + ","
                json += atr("type", curr.type) + ","
                json += atr("room", curr.room) + ","
                json += atr("note", curr.note)
                json += "}"

            }
        }
    json += "]"
    if (i != 6) {
        json += ","
    }
}

json += "]"

function atr(name, val) {
    return '"' + name + '":"' + val + '"'
}

console.log(json)