import { controller } from "../../lib/modules/controller-manager.module";

export default controller()
  .handle(async (request, res) => {

    const { s: section } = request.queryParams;

    if (!section) {
      return res.json([1])     
    }

    
    // return res.json([0]) // player not found
    return res.json([
      1,  // action
      4,  // position user
      99, // GP user
      24,  // rank user
      'lnferno', // nickname user,
      'GM', // guild name user
    ])
  })
  .routes("/r.php");
