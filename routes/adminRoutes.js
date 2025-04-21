const express = require("express");
const { protect, authorizeRoles, authorizeSuperAdmin } = require("../authMiddleware/authMiddleware");
const {
    registerAdmin, 
    loginAdmin,
    getAllUsers,
    getAllShopOwners,
    updateShopOwner,
    getAllShopWallets,
    getPendingSalonRequests,
    getShopOwnerPayInReport,
    getShopOwnerPayoutReport,
    getAllUserPayInReport,
    updateSalon
} = require("../controllers/adminController");


const router = express.Router();


router.post("/login", loginAdmin);
router.post("/register", registerAdmin); 


router.get("/admin-users", protect, authorizeRoles("super_admin", "admin"), getAllUsers);
router.get("/users", getAllUsers);
router.get("/shop-owners", protect, authorizeRoles("super_admin", "admin"), getAllShopOwners);
router.get("/shopOwners", getAllShopOwners);


router.get("/shop-requests", protect, authorizeRoles("super_admin", "admin"), getPendingSalonRequests);
router.put("/update-salon/:id",protect, authorizeRoles("super_admin", "admin"),updateSalon);


router.get("/shop-wallets", protect, authorizeRoles("super_admin", "admin"), getAllShopWallets);
router.get("/reports/shop-owner/:ownerId/payin", protect, authorizeRoles("super_admin", "admin"), getShopOwnerPayInReport);
router.get("/reports/shop-owner/:ownerId/payout", protect, authorizeRoles("super_admin", "admin"), getShopOwnerPayoutReport);
router.get("/reports/users/payin", protect, authorizeRoles("super_admin", "admin"), getAllUserPayInReport);

module.exports = router;
