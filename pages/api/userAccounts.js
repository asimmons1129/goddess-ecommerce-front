import { mongooseConnect } from "../../lib/mongoose";


export default async function handle(req, res){
    await mongooseConnect();
    if(req.method === 'PUT'){
        const {user} = await getServerSession(req, res, authOptions);
        const userAddress = await UserAccount.findOne({userEmail:user.email});
        if(userAddress){
            res.json(await UserAccount.findByIdAndUpdate(userAddress._id, req.body));
        } else {
            res.json(await UserAccount.create({userEmail:user.email, ...req.body}));
        }
    }
    if(req.method === 'GET'){
        const {user} = await getServerSession(req, res, authOptions);
        const userAddress = await UserAccount.findOne({userEmail:user.email});
        res.json(userAddress);
    }
}
