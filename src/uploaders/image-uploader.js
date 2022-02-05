import { apps } from "@dash-incubator/dapp-sdk";
import { alert } from "ui/components";
import { directive, dom } from "ui/lib";

const image = () => {
    async function save(data) {
        let result = await apps.upload.image.save(
            await apps.upload.image.create(data)
        );

        console.log(result);
    }

    const metadata = async function (e) {
        let button = this.element,
            data = dom.element("image");

        for (let key in data) {
            if (key === "keywords") {
                let values = [];

                for (let k in data[key]) {
                    if (!data[key][k].value) {
                        continue;
                    }

                    values.push(data[key][k].value);
                }

                data[key] = values;
            } else if (["compress", "encrypt"].includes(key)) {
                data[key] = data[key].checked || false;
            } else if (key === "image") {
                let files = data.image.files;

                delete data.image;

                if (files.length === 1) {
                    data.image = files[0];
                } else if (files.length > 1) {
                    data.gallery = files;
                }
            } else {
                data[key] = data[key].value || "";
            }
        }

        button.classList.add("button--processing");

        await save(data);

        button.classList.remove("button--processing");
        alert.success(
            "Dash Document saved successfully! Check console for output"
        );
    };

    const image = async function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.element.labels[0].classList.add("--hidden");
        this.refs.metadata.classList.remove("--hidden");
    };

    const reset = function (e) {
        this.value = "";
    };

    const handleImage = () => {
        directive.on("upload.image", image);
        directive.on("upload.reset", reset);
        directive.on("upload.metadata", metadata);
    };

    return handleImage;
};

export default image;
