const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const cors = require("cors");
const path=require("path")

app.use(cors());
app.use(express.static("list-indents/build"))

async function runSample(projectId) {
  const intentsClient = new dialogflow.IntentsClient({
    keyFilename: "./trini-task-bamb-68ce83713e73.json",
  });

  try {
    const list = await intentsClient.listIntents({ parent: `projects/${projectId}/agent` });
    const result = [];
    list[0].map((l) => {
      const obj = {
        name: l.name,
        displayName: l.displayName,
      };
      result.push(obj);
    });
    return result;
  } catch {
    console.log("error");
  }
}

app.get("/api/intent-list", async (req, res) => {
  const result = await runSample("trini-task-bamb");
  if (result) {
    res.json(result);
  } else [res.status(400).send("error")];
});

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"list-indents","build","index.html"))
})

app.listen(process.env.PORT || 4500, () => {
  console.log("Server started");
});
