import { registerAs } from "@nestjs/config";
import { Config } from "src/modules/core/enums/Config";

export default registerAs(Config.STRIPE, () => ({
  secretKey: "whsec_5QIywcRJ5Ae280j5hWeK933LjmB32MGF",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
}));
