(function($) {
    $(document).ready(function() {
        function getCurrentTime() {
            return new Date().getTime();
        }

        function ImageAnim(image, frameWidth, frameRate) {
            this.image         = image;
            this.frameWidth    = frameWidth;
            this.frameRate     = frameRate;
            this.frameDuration = 1000 / frameRate;
            this.frameCount    = Math.floor(image.width / frameWidth);
        }

        ImageAnim.prototype.start = function(context) {
            var self = this;

            this.animStartTime = getCurrentTime();
            this.context       = context;
            this.intervalID    = window.setInterval(function() { self.draw(); }, this.frameDuration);

            this.draw();
        };

        ImageAnim.prototype.draw = function() {
            var animTime   = getCurrentTime() - this.animStartTime;
            var frameIndex = Math.floor(animTime / this.frameDuration) % this.frameCount;
            var xOffset    = frameIndex * this.frameWidth;

            this.context.drawImage(this.image, xOffset, 0, this.frameWidth, this.image.height, 0, 0, this.frameWidth, this.image.height);
        };

        ImageAnim.prototype.stop = function() {
            window.clearInterval(this.intervalID);
            this.context = null;
        };

        $('.image-anim').each(function() {
            var self = $(this);
            var imageURL = self.attr('data-image-anim');
            var image = new Image();

            image.onload = function() {
                var parent = self.wrap('<div class="image-anim-container" />').parent();
                var canvas = $('<canvas class="image-anim-frame" width="220" height="165" />').insertAfter(self).hide();

                var imageAnim = new ImageAnim(image, 220, 5);

                parent.mouseenter(function() {
                    imageAnim.start(canvas[0].getContext('2d'));
                    canvas.show('fast');
                }).mouseleave(function() {
                    canvas.hide('fast');
                    imageAnim.stop();
                });
            };

            image.src = imageURL;
        });
    });
})(jQuery);
