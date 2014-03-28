/* GCompris - Colors.qml
 *
 * Original activity in the Gtk+ version of GCompris by
 * Pascal Georges (pascal.georges1@free.fr)
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

import QtQuick 2.1
import QtMultimedia 5.0

import "qrc:/gcompris/src/core"
import "findit.js" as Activity


ActivityBase {
    id: activity
    focus: true

    property variant dataset
    property int itemWidth
    property int itemHeight


    pageComponent: Rectangle{
        id: background
        signal start
        signal stop
        focus: true
        gradient: Gradient {
                GradientStop { position: 0.0; color: "lightsteelblue" }
                GradientStop { position: 0.5; color: "blue" }
            }

        Component.onCompleted: {
            activity.start.connect(start)
            activity.stop.connect(stop)
            }

        QtObject {
            id: items
            property alias background: background
            property alias bar: bar
            property alias bonus: bonus
            property alias containerModel: containerModel
            property alias questionItem: questionItem

            }

        onStart: { Activity.start(items, dataset) }
        onStop: { Activity.stop() }

        // Answer side
        ListModel {
              id: containerModel
                }

        ListView {
            anchors{
                horizontalCenter: background.horizontalCenter
                verticalCenter: background.verticalCenter
                    }
            model: containerModel
            delegate: Column {// Printing options calling 2 functions from findit.js for 3 options
                id :col
                ColorItem{
                    answer: Activity.getCurrentAnswer()
                          }
                ColorItem{
                    answer: Activity.getPerviousAnswer()
                        }
                ColorItem{
                    answer: Activity.getNextAnswer()
                         }
                       }
                    }
        // Question Side
         Text {
            id: questionItem
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: parent.top
            anchors.topMargin: 180
            font.pointSize: 20
            font.weight: Font.DemiBold
            style: Text.Outline
            styleColor: "black"
            color: "white"
            // When Question is fully loaded
            function initQuestion() {
                text = Activity.getCurrentTextQuestion()
                opacity = 1.0
            }
            // Animation during question change
            onOpacityChanged: opacity == 0 ? initQuestion() : ""
            Behavior on opacity { PropertyAnimation { duration: 500 } }
        }
         Text {
            anchors.horizontalCenter: background.horizontalCenter
            anchors.top: background.top
            anchors.topMargin: 50
            font.pointSize: 50
            text :"Nursery Rhymes"
            font.weight: Font.Normal
            style: Text.Outline
            styleColor: "black"
            color: "DarkBlue"
         }

        DialogHelp {
            id: dialogHelp
            onClose: home()
        }

        Bar {
            id: bar
            content: BarEnumContent { value: help | home | previous | next }
            onHelpClicked: {
                displayDialog(dialogHelp)
            }
            onPreviousLevelClicked: Activity.previousLevel()
            onNextLevelClicked: Activity.nextLevel()
            onHomeClicked: activity.home()
        }

        Bonus {
            id: bonus
            Component.onCompleted: win.connect(Activity.nextLevel)
        }

    }

}
