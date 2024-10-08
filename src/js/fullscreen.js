import utils from './utils';

class FullScreen {
    constructor(player) {
        this.player = player;
        this.lastScrollPosition = { left: 0, top: 0 };
        this.player.events.on('webfullscreen', () => {
            this.player.resize();
        });
        this.player.events.on('webfullscreen_cancel', () => {
            this.player.resize();
            utils.setScrollPosition(this.lastScrollPosition);
        });

        this.fullscreenchange = () => {
            this.player.resize();
            if (this.isFullScreen('browser')) {
                this.player.events.trigger('fullscreen');
            } else {
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.template.controllerTop.style.display = 'none';
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        this.docfullscreenchange = () => {
            const fullEle = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (fullEle && fullEle !== this.player.container) {
                return;
            }
            this.player.resize();
            if (fullEle) {
                this.player.events.trigger('fullscreen');
            } else {
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.template.controllerTop.style.display = 'none';
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        if (/Firefox/.test(navigator.userAgent)) {
            document.addEventListener('mozfullscreenchange', this.docfullscreenchange);
            document.addEventListener('fullscreenchange', this.docfullscreenchange);
        } else {
            this.player.container.addEventListener('fullscreenchange', this.fullscreenchange);
            this.player.container.addEventListener('webkitfullscreenchange', this.fullscreenchange);
            document.addEventListener('msfullscreenchange', this.docfullscreenchange);
            document.addEventListener('MSFullscreenChange', this.docfullscreenchange);
        }
    }

    isFullScreen(type = 'browser') {
        switch (type) {
            case 'browser':
                return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            case 'web':
                return this.player.container.classList.contains('dplayer-fulled');
        }
    }

    request(type = 'browser') {
        this.player.template.controllerTop.style.display = 'flex';
        const anotherType = type === 'browser' ? 'web' : 'browser';
        const anotherTypeOn = this.isFullScreen(anotherType);

        if (!anotherTypeOn) {
            this.lastScrollPosition = utils.getScrollPosition();
        }
        console.log(type, anotherType, anotherTypeOn, this.lastScrollPosition);

        switch (type) {
            case 'browser':
                if (this.player.container.requestFullscreen) {
                    console.log('requestFullscreen');
                    this.player.container.requestFullscreen();
                } else if (this.player.container.mozRequestFullScreen) {
                    console.log('mozRequestFullScreen');
                    this.player.container.mozRequestFullScreen();
                } else if (this.player.container.webkitRequestFullscreen) {
                    console.log('webkitRequestFullscreen');
                    this.player.container.webkitRequestFullscreen();
                } else if (this.player.video.webkitEnterFullscreen) {
                    // Safari for iOS
                    console.log('webkitEnterFullscreen');
                    this.player.video.webkitEnterFullscreen();
                } else if (this.player.video.webkitEnterFullScreen) {
                    console.log('webkitEnterFullScreen');
                    this.player.video.webkitEnterFullScreen();
                } else if (this.player.container.msRequestFullscreen) {
                    console.log('msRequestFullscreen');
                    this.player.container.msRequestFullscreen();
                }
                break;
            case 'web':
                this.player.container.classList.add('dplayer-fulled');
                document.body.classList.add('dplayer-web-fullscreen-fix');
                this.player.events.trigger('webfullscreen');
                break;
        }

        if (anotherTypeOn) {
            this.cancel(anotherType);
        }
    }

    cancel(type = 'browser') {
        this.player.template.controllerTop.style.display = 'none';
        switch (type) {
            case 'browser':
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.webkitCancelFullscreen) {
                    document.webkitCancelFullscreen();
                } else if (document.msCancelFullScreen) {
                    document.msCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                break;
            case 'web':
                this.player.container.classList.remove('dplayer-fulled');
                document.body.classList.remove('dplayer-web-fullscreen-fix');
                this.player.events.trigger('webfullscreen_cancel');
                break;
        }
    }

    toggle(type = 'browser') {
        if (this.isFullScreen(type)) {
            this.cancel(type);
        } else {
            this.request(type);
        }
    }

    destroy() {
        if (/Firefox/.test(navigator.userAgent)) {
            document.removeEventListener('mozfullscreenchange', this.docfullscreenchange);
            document.removeEventListener('fullscreenchange', this.docfullscreenchange);
        } else {
            this.player.container.removeEventListener('fullscreenchange', this.fullscreenchange);
            this.player.container.removeEventListener('webkitfullscreenchange', this.fullscreenchange);
            document.removeEventListener('msfullscreenchange', this.docfullscreenchange);
            document.removeEventListener('MSFullscreenChange', this.docfullscreenchange);
        }
    }
}

export default FullScreen;
