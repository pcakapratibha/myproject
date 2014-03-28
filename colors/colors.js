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

//creating 5 levels with one question in each level
var colors =
        [
            [ // Level 1
             {
                 "text": "Jack and Jill went up the ___",
                 "answer": "hill"
             }],
            [  // Level 2
             {
                 "text": "In the jungle,the mighty jungle ___ sleeps tonight ",
                 "answer": "Lion"
             }],
            [   // Level 3
             {
                 "text": "Old MacDonald had a ___",
                 "answer": "farm"
             }],
             [// Level 4
              {
                 "text": "The itsy bitsy ____ ",
                 "answer": "spider"
             }],
             [// Level 5
              {
                 "text": "Eeny, meeny, miny,____",
                 "answer": "moe"
             }]
        ]

function get() {
    return colors
}

