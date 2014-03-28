/* GCompris
 *
 * Copyright (C) 2014 Bruno Coudoin
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

.pragma library
.import QtQuick 2.0 as Quick

var currentLevel = 0
var numberOfLevel
var items
var dataset

var currentQuestion

function start(items_, dataset_) {
    items = items_
    dataset = dataset_
    numberOfLevel = dataset.length
    initLevel()
}

function stop() {
}

function initLevel() {
    items.bar.level = currentLevel + 1
    items.containerModel.clear()
    currentQuestion = 0
    dataset[currentLevel] = shuffle(dataset[currentLevel])

    for(var i = 0;  i < dataset[currentLevel].length; ++i) {
        items.containerModel.append(dataset[currentLevel][i])
    }


    // Shuffle again not to ask the question in the model order
    dataset[currentLevel] = shuffle(dataset[currentLevel])
    initQuestion()
}

function initQuestion() {
    // We just set the opacity to 0, the questionItem will then grab
    // the new question by itself
    items.questionItem.opacity = 0
    //items.answerItem.opacity = 0
}

function nextQuestion() {
    if(dataset[currentLevel].length <= ++currentQuestion ) {
        items.bonus.good("flower")
    } else {
        initQuestion()
    }
}

function nextLevel() {
    if(numberOfLevel <= ++currentLevel ) {
        currentLevel = 0
    }
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }
    initLevel();
}

function getCurrentTextQuestion() {
    return dataset[currentLevel][currentQuestion].text
}
function getCurrentAnswer() {
    return dataset[currentLevel][currentQuestion].answer
}

function getPerviousAnswer(){
    var per = currentLevel // assigning to different variable,current variable will not change
    if (per>=0 && per<6)
    {
        if(--per <= 0) {
            per = numberOfLevel - 1
        }
        return dataset[--per][currentQuestion].answer
    }

}

function getNextAnswer()
{
    var nex = currentLevel // assigning to different variable
    if (nex>=0 && nex<=5)
    {
        if(numberOfLevel <= ++nex ) {
            nex = 0
        }
        return dataset[++nex][currentQuestion].answer
    }

}

function lost() {
    items.bonus.bad("flower")
}


function shuffle(o) {
    for(var j, x, i = o.length; i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
