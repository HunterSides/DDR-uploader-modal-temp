import { image, video, audio } from "./uploaders";
import { directive, dom } from "ui/lib";

const videoType = ".mp4";
const imageType = "image/*";
const audioType = ".mp3";

const fileInput = document.getElementById("input");

const handleFiles = () => {
    var fileName = fileInput.files[0].name;

    var assetType = fileName.split(".").pop();

    return assetType;
};

const handleAsset = (assetType) => {
    if (assetType == imageType) {
        image();
    } else if (assetType == videoType) {
        video();
    } else if (assetType == audioType) {
        audio();
    } else {
    }
};

fileInput.addEventListener("change", handleFiles);
directive.on("upload", handleAsset);
