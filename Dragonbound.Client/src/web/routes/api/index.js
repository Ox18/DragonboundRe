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
router.use("/v1/servers", ServersRoute);
router.use("/v1/accounts", AccountsRoute);
router.use("/v1/avatar_equipeds", AvatarEquipedsRoute);
router.use("/v1/events", EventsRoute);
router.use("/v1/guild_members", GuildMembersRoute);
router.use("/v1/prix_users", PrixUsersRoute);
router.use("/v1/relationships", RelationshipsRoute);
router.use("/v1/users", UsersRoute);

export default router;