import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const { entry, getAsset } = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} subtitle={entry.getIn(["data", "subtitle"])} />

      <div className="bg-grey-1 pv4">
        <div className="flex-l mhn1-l ph3 center mw7">
          <h2 className="f2 b lh-title mb2 w-40-l">{entry.getIn(["data", "blurb", "heading"])}</h2>
          <p className="w-60-l mb0">{entry.getIn(["data", "blurb", "text"])}</p>
        </div>
      </div>

      <div className="bg-off-white pv4">
        <div className="ph3 mw7 center">
          <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
          <p className="mb4 mw6">{entry.getIn(["data", "intro", "text"])}</p>

          <div className="flex-ns mhn2-ns mb3">
            {(entry.getIn(["data", "products"]) || []).map((product, i) => <div className="ph2-ns w-50-ns" key={i}>
              <img src={getAsset(product.get("image"))} alt="" className="center db mb3" style={{ width: "240px" }} />
              <p>{product.get("text")}</p>
            </div>)}
          </div>

        </div>
      </div>

      <div class="ph3 bg-grey-1 pv5">
        <div data-aos="fade-right" class="ph3 mw7 center">
          <h2 class="f2 b lh-title mb2">{entry.getIn(["data", "titoloContatti"])}</h2>
          {(entry.getIn(["data", "contatti"]) || []).map((contatto, i) => <div class="fl w-100 w-33-ns pa2">
            <h4 class="f4 b lh-title mb2 primary">{contatto.get("titolo")}</h4>
            <p class="mb0">{contatto.get("linea1")}</p>
            <p>{contatto.get("linea2")}</p>
          </div>)}

          <div class="w-100">
            <iframe class="center" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0"
              marginwidth="0"
              src={entry.getIn(["data", "openstreetmapUrl"])}
              >
            </iframe>
          </div>
        </div>
      </div>

    </div>
  }
}