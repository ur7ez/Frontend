/**
 * Cookies - A small class to manipulate cookies from javascript
 * Compressed version: https://gist.github.com/4147384
 * @see    www.quirksmode.org/js/cookies.html
 * @author    Anis uddin Ahmad <anisniit@gmail.com>
 */

"use strict";
export let Cookies = {

    /**
     * Set/Overwrite a cookie value
     *
     * @param name
     * @param value
     * @param days      OPTIONAL Days till this cookie will stay valid. Default is current session
     * @param path      OPTIONAL domain root will be used by default
     */
    set: function (name, value, days, path) {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        let dir = path || '/';
        document.cookie = name + "=" + value + expires + "; path=" + dir;
    },

    /**
     * Retrieve a cookie value
     *
     * @param name
     * @return String|null
     */
    get: function (name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    /**
     * Remove a cookie
     *
     * @param name
     */
    delete: function (name) {
        this.set(name, "", -1);
    }
};