(function($) {
    $(document).ready(function() {
        var imageAnimList = {};

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
            this.animStartTime = getCurrentTime();
            this.context       = context;
        };

        ImageAnim.prototype.draw = function() {
            var animTime   = getCurrentTime() - this.animStartTime;
            var frameIndex = Math.floor(animTime / this.frameDuration) % this.frameCount;
            var xOffset    = frameIndex * this.frameWidth;

            this.context.drawImage(this.image, xOffset, 0, this.frameWidth, this.image.height, 0, 0, this.frameWidth, this.image.height);
        };

        ImageAnim.prototype.stop = function() {
            this.context = null;
        };

        $('.image-anim').each(function() {
            var imageURL = $(this).attr('data-image-anim');
            var image = new Image();

            $('<canvas width="220" height="165" />').insertAfter($(this)).hide();

            image.onload = function() {
                imageAnimList[imageURL] = new ImageAnim(image, 220, 5);
            };

            image.src = imageURL;
        });

        $('.image-anim').mouseenter(function() {
            var canvas    = $(this).next();
            var imageURL  = $(this).attr('data-image-anim');
            var imageAnim = imageAnimList[imageURL];

            imageAnim.start(canvas.getContext('2d'));
            canvas.show();
        }).mouseleave(function() {
            var canvas    = $(this).next();
            var imageURL  = $(this).attr('data-image-anim');
            var imageAnim = imageAnimList[imageURL];

            canvas.hide();
            imageAnim.stop();
        });
    });
})(jQuery);
