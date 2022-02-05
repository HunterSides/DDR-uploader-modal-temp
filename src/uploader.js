import { image, video, audio } from "./uploaders";
import { directive, dom } from "ui/lib";

const videoType = ".mp4";
const imageType = "image/*";
const audioType = ".mp3";

const handleAsset = function() {
    let file = this.element.files[0];

    if (file.type.startsWith('image/')) {
        console.log('image');
        image();
    } else if (file.type == videoType) {
        console.log('video');
        video();
    } else if (file.type == audioType) {
        console.log('audio');
        audio();
    }
};

directive.on("upload", handleAsset);
