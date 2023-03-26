var addedDays = []
var addedSlots = []
var cells={}



$(document).ready(function () {
    var table = $('#table')
    var row = `<tr class="slotsRow" ><th class="time-table-head">Time Table</th></tr>`
    table.append(row)

})



function deleteText(id){
    id.remove()
}


function addAgenda(){
    var selectDay=document.querySelector("#select-day").value
    var selectSlot=document.querySelector("#select-slot").value
    dayExists=false
    addedDays.forEach(d => {
        if (d == selectDay) {
            dayExists = true
        }
    })
    if(!dayExists){
        alert("Selected day is not in the schedule")
        return
    }


    slotExists=false
    addedSlots.forEach(s => {
        if (s == selectSlot) {
            slotExists = true
        }
    })
    if(!slotExists){
        alert("Selected slot is not in the schedule")
        return
    }

    var text=document.querySelector("#cell-text").value
    if(text.length==0){
        alert("Text Must not be empty")
        return
    }
    var row = document.querySelector("#"+selectDay)    
    var col = document.querySelector("#"+selectSlot)    
    
    var i=0
    for(;i<addedSlots.length;i++){
        if(selectSlot==addedSlots[i])
            break
    }
    
    if(cells[selectDay][i].innerHTML.length!=0){
        alert("You can not override/replace the agenda item")
        return
    }
    cell=cells[selectDay][i]
    

    cell.innerHTML=`<span id=${text+i+'gh'}> <span id=${text+i}>${text}</span> <img id=${text+i+'_img'} onclick="deleteText(${text+i+'gh'})" src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png"/>`
    cell.addEventListener("mouseover",e=>{

        //.classList.removeClass('.new-class');
        document.getElementById(text+i).className='' 
        document.getElementById(`${text+i+'_img'}`).className=''
        document.getElementById(text+i).classList.add("hide-class")
        
        document.getElementById(`${text+i+'_img'}`).classList.add("show-class")
        
        
    })
    cell.addEventListener("mouseleave",e=>{
        document.getElementById(text+i).className=''
        document.getElementById(`${text+i+'_img'}`).className=''
        document.getElementById(text+i).classList.add("show-class")
        document.getElementById(`${text+i+'_img'}`).classList.add("hide-class")
    })



}


function addRow() {
    var table = $('#table')
    var exists = false
    day = document.querySelector("#day").value
    addedDays.forEach(d => {
        if (d == day) {
            exists = true
            return
        }
    })
    if (!exists) {
        addedDays.push(day)
        var row = `<tr id='${day}'><th>${day}</th></tr>`
        table.append(row)

        colCount=$("table").find("tr:first td").length
        row = document.querySelector("#"+day)     

        cells={
            ...cells,
            [day]:[]
        }
        for(var i=1;i<=colCount;i++){
            cells[day].push( row.insertCell(i))
        }


        return
    }
    alert(`${day} is already added`)
}

function addCol() {
    var table = $('#table')
    var exists = false
    slot = document.querySelector("#slot").value
    addedSlots.forEach(s => {
        if (slot == s) {
            exists = true
            return
        }
    })
    if (!exists) {
        addedSlots.push(slot)

        slotsRow = document.querySelector("tr")

        col = slotsRow.insertCell(addedSlots.length)
        col.innerHTML = slot
        col.id=slot

        addedDays.forEach(rowValue=>{
            colCount=$("table").find("tr:first td").length
            cell=document.querySelector("#"+rowValue).insertCell(colCount)
            cells[rowValue].push(cell)
            
        })

        return
    }
    alert(`${slot} is already added`)

}