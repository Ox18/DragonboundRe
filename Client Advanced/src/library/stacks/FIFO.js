/*
 * Copyright (C) 2021, lnferno. <xander.scorpio@gmail.com>
 * All rights reserved to XFS Games (xfsgames.com.ar).
 * 
 * This file is part of SocialBound.
 * SocialBound is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.
 *
 * SocialBound is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with SocialBound. If not, see http://www.gnu.org/licenses/.
 */

/**
 * @Class FIFO
 * @classdesc A FIFO stack. The first element added is the first element to be removed.
 */
class FIFO{
    constructor(...elements){
        this.elements = [...elements];
    }

    /**
     * The method push add elements to the stack.
     * @param  {...any} args Arguments to be added to the stack.
     * @returns Array
     */
    push(...args){
        return this.elements.push(...args);
    }

    /**
     * The method pop remove elements from the stack.
     * @param  {...any} args Arguments to be added to the stack.
     * @returns Array
     */
    shift(...args){
        return this.elements.shift(...args);
    }

    /**
     * Method to get the length of the stack.
     * @param  {...any} args Arguments to be added to the stack.
     * @returns {Number} The length of the stack.
     */
    getLength(...args){
        return this.elements.length;
    }
    
    /**
     * Method to set the length of the stack.
     * @param {Number} length The length of the stack.
     */
    setLength(length){
        this.elements.length = length;
    }
}

module.exports = FIFO;
