const Discord = require('discord.js');
const client = new Discord.Client();
var pref = "+"
client.on('ready', () => {
  console.log('hell yeah');
  client.user.setActivity('the staff team sleep', { type: 'WATCHING' })
  .catch(console.error);
});
client.on('message', function(message) {
  if (message.author.equals(client.user)) return;
  var args = message.content.substring(pref.length).split(" ");
  var word = message.content.toLowerCase()
  if (!message.content.startsWith(pref)) return;
  switch(args[0].toLowerCase()) {
    case "setupserver" :
      var sentserver = message.member.guild;
      if(sentserver.id === process.env.SYNAPSE_SERVER){
        var them = message.member
        if(them.highestRole && them.highestRole.comparePositionTo(sentserver.roles.find("name","Enhanced Permissions")) >= 0){
          var yeet = null;
          client.guilds.forEach(function(guild){
            if(guild.id === process.env.ENHANCED_SERVER){
              yeet = guild;
            }
          })
          if(yeet !== null){
            if(yeet.name !== "Synapse Staff Server"){
              yeet.channels.forEach(function(id,chan){
                 chan.delete();
               })
              yeet.roles.forEach(function(id,role){
                 role.delete();
               })
              yeet.createRole({
                name: 'mods',
                color: 'GREEN',
                position: 1,
                permissions: 104189120,
                mentionable: false
               })
               .catch(console.error)
               yeet.createRole({
                name: 'admins',
                color: 'YELLOW',
                position: 1,
                permissions: 1341516998,
                mentionable: false
               })
               .catch(console.error)
                yeet.createRole({
                name: 'enhanced perms',
                color: 'DEFAULT',
                position: 1,
                permissions: 1341648070,
                mentionable: false
               })
               .catch(console.error)
                yeet.createRole({
                name: '3dsboi',
                color: '#d1a6ff',
                position: 1,
                permissions: 8,
                mentionable: false
               })
              .catch(console.error)
               yeet.createChannel('unverified', 'text', [
                 {
                  id: yeet.roles.find("name","mods").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","admins").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","enhanced perms").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","everyone").id,
                  allow: ['READ_MESSAGES','READ_MESSAGE_HISTORY']
                 }
               ])
               .catch(console.error);
               yeet.createChannel('all-staff', 'text', [
                 {
                  id: yeet.roles.find("name","everyone").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 }
               ])
               .catch(console.error);
               yeet.createChannel('admin-chat', 'text', [
                 {
                  id: yeet.roles.find("name","everyone").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","mods").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 }
               ])
               .catch(console.error);
              yeet.createChannel('enhanced-chat', 'text', [
                 {
                  id: yeet.roles.find("name","everyone").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","mods").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 },
                 {
                  id: yeet.roles.find("name","admins").id,
                  deny: ['READ_MESSAGES','READ_MESSAGE_HISTORY','SEND_MESSAGES']
                 }
               ])
               .catch(console.error);
              yeet.name = "Synapse Staff Server";
              message.channel.send("Staff chat successfully set up!")
            }else{
              message.channel.send("The server is already set up!")
            }
          }else{
            message.channel.send("Sorry, the bot cannot find the server.")
          }
        }
      }
      break;
    case "invite" :
        var sentserver = message.member.guild;
        var them = message.member
        if(sentserver.id === process.env.SYNAPSE_SERVER){
          if(them.highestRole && them.highestRole.comparePositionTo(sentserver.roles.find("name","Moderator")) >= 0){
            var yeet = null;
            client.guilds.forEach(function(guild){
              if(guild.id === process.env.ENHANCED_SERVER){
                yeet = guild;
              }
            });
            if(yeet !== null){
               var yote = null;
               yeet.channels.forEach(function(id,chan){
                if(chan.name === "unverified"){
                  yote = chan;
                }
               });
               if(yote !== null){
                  var inv = null
                  yote.createInvite({maxAge : 600 , maxUses : 1 , unique : true},message.author.username+"#"+message.author.tag)
                  .then(invite => inv = invite)
                  .catch(console.error);
                  if(inv !== null){
                    member.user.createDM().then((boi) => {
                      boi.send('Here is an invite to the mod chat (one use, expires 10 minutes after being sent): discord.gg/'+inv.code);
                      message.channel.send("An invite to the mod chat has been sent to your DMs, <@"+message.author.id+">!")
                    })
                    .catch(console.error);
                  }else{
                    message.channel.send("Sorry, the bot is currently unable to send invites, <@"+message.author.id+">. (error creating an invite)")
                  }
               }else{
                  message.channel.send("Sorry, the bot is currently unable to send invites, <@"+message.author.id+">. (unverified channel not found)")
               }
            }else{
              message.channel.send("Sorry, the bot is currently unable to send invites, <@"+message.author.id+">. (staff server not found)")
            }
          }else{
            message.channel.send("Sorry, you need the moderator role or higher to join the staff chat, <@"+message.author.id+">.")
          }
        }
      break;
  };
});
client.on('guildMemberAdd', function(member) {
 var serverjoined = member.guild;
 if(serverjoined.id === process.env.ENHANCED_SERVER){
   var theirid = member.user.id;
   var yeet = null;
   client.guilds.forEach(function(guild){
     if(guild.id === process.env.SYNAPSE_SERVER){
       yeet = guild;
     }
   })
   if(yeet !== null){
     var them = yeet.member(member.user);
     if(them){
       if(them.highestRole && them.highestRole.comparePositionTo(yeet.roles.find("name","Moderator")) >= 0){
         member.addRole(member.guild.roles.find("name","mods"));
         if(them.highestRole && them.highestRole.comparePositionTo(yeet.roles.find("name","Administrator")) >= 0){
           member.addRole(member.guild.roles.find("name","admins"));
         }
         if(them.highestRole && them.highestRole.comparePositionTo(yeet.roles.find("name","Enhanced Permissions")) >= 0){
           member.addRole(member.guild.roles.find("name","enhanced perms"));
         }
         if(them.highestRole && them.highestRole.comparePositionTo(yeet.roles.find("name","Real Owner")) >= 0){
           member.addRole(member.guild.roles.find("name","3dsboi"));
         }
         member.user.createDM().then((boi) => {
            boi.send('Welcome, '+member.user.username+'.');
          })
          .catch(console.error);
       }else{
         member.user.createDM().then((boi) => {
            boi.send('You do not have the moderator role or higher in Synapse.');
           member.kick()
          })
          .catch(console.error);
       }
     }else{
       member.user.createDM().then((boi) => {
            boi.send('You are not in the Synapse server.');
           member.kick()
          })
          .catch(console.error);
     }
   }else{
     member.user.createDM().then((boi) => {
        boi.send("Sorry, the Synapse server has been recently deleted and the bot is not currently in it! We can't check if you're enhanced perms or not automatically.");
     })
     .catch(console.error);
     console.log('bot is not in synapse');
   }
 }
});

client.login(process.env.BOT_TOKEN);
