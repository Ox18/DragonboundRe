import { Router } from "express";
import * as Get_StatusController from "../../controllers/api/get_status";
import ServersRoute from "./servers/index";
import AccountsRoute from "./Accounts";
import AvatarEquipedsRoute from "./AvatarEquipeds";
import EventsRoute from "./Events";
import GuildMembersRoute from "./GuildMembers"
import PrixUsersRoute from "./PrixUsers";
import RelationshipsRoute from "./Relationships";
import UsersRoute from "./Users";

const router = Router();

router.get("/get_status", Get_StatusController.get);
router.use("/servers", ServersRoute);
router.use("/accounts", AccountsRoute);
router.use("/avatar_equipeds", AvatarEquipedsRoute);
router.use("/events", EventsRoute);
router.use("/guild_members", GuildMembersRoute);
router.use("/prix_users", PrixUsersRoute);
router.use("/relationships", RelationshipsRoute);
router.use("/users", UsersRoute);

export default router;