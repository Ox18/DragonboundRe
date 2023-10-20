import { controller } from "../../lib/modules/controller-manager.module";

export default controller()
  .handle(async (request, res) => {
    res.json([
      new Date(),
      Array.from({length: 24}, (v, i) => i + 400), // GP total per rank
      Array.from({length: 24}, (v, i) => i + 200), // Players total per rank
      Array.from({length: 24}, (v, i) => i + 100), // Rules per rank
    ]);
  })
  .routes("/i");
