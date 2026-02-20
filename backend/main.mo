import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Pricing = {
    #free;
    #freemium;
    #paid;
  };

  public type Tool = {
    id : Nat;
    name : Text;
    slug : Text;
    description : Text;
    categories : [Text];
    pricing : Pricing;
    website : Text;
    rating : Nat; // 1-5
    rankingScore : Nat;
    tags : [Text];
    bestFor : [Text];
    pros : [Text];
    cons : [Text];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  module Tool {
    public func compare(tool1 : Tool, tool2 : Tool) : Order.Order {
      Nat.compare(tool2.rankingScore, tool1.rankingScore);
    };
  };

  let tools = Map.empty<Nat, Tool>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextId = 1;

  // Initialize with example tools
  func seedInitialTools() {
    let initialTools : [Tool] = [
      {
        id = 1;
        name = "Stable Diffusion";
        slug = "stable-diffusion";
        description = "Open-source AI image generator";
        categories = ["Image Editing", "AI Art"];
        pricing = #free;
        website = "https://stablediffusionweb.com";
        rating = 5;
        rankingScore = 10;
        tags = ["ai", "image", "art", "generator"];
        bestFor = ["Artists", "Content Creators"];
        pros = ["Free", "High Quality"];
        cons = ["Learning curve"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 2;
        name = "ChatGPT";
        slug = "chatgpt";
        description = "AI chatbot and content generator";
        categories = ["Content Creation", "Productivity"];
        pricing = #freemium;
        website = "https://chat.openai.com";
        rating = 5;
        rankingScore = 10;
        tags = ["chatbot", "content", "ai", "writer"];
        bestFor = ["Students", "Business"];
        pros = ["Versatile", "Continuous Updates"];
        cons = ["Occasional Hallucinations"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 3;
        name = "GitHub Copilot";
        slug = "github-copilot";
        description = "AI pair programmer for code completion";
        categories = ["Coding Assistance", "Productivity"];
        pricing = #paid;
        website = "https://github.com/features/copilot";
        rating = 4;
        rankingScore = 8;
        tags = ["coding", "ai", "developer", "autocomplete"];
        bestFor = ["Developers", "Programmers"];
        pros = ["Fast", "Context-aware"];
        cons = ["Subscription required"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 4;
        name = "Midjourney";
        slug = "midjourney";
        description = "AI art generator with stunning visuals";
        categories = ["Image Editing", "AI Art"];
        pricing = #paid;
        website = "https://midjourney.com";
        rating = 5;
        rankingScore = 10;
        tags = ["ai", "art", "image", "creative"];
        bestFor = ["Artists", "Designers"];
        pros = ["High quality", "Artistic style"];
        cons = ["Discord-based", "Paid only"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 5;
        name = "Notion AI";
        slug = "notion-ai";
        description = "AI writing assistant integrated with Notion";
        categories = ["Content Creation", "Productivity"];
        pricing = #freemium;
        website = "https://notion.so";
        rating = 4;
        rankingScore = 8;
        tags = ["productivity", "writing", "ai", "notes"];
        bestFor = ["Teams", "Students"];
        pros = ["Integrated", "Easy to use"];
        cons = ["Limited free tier"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 6;
        name = "Jasper AI";
        slug = "jasper-ai";
        description = "AI content creation platform for marketing";
        categories = ["Content Creation"];
        pricing = #paid;
        website = "https://jasper.ai";
        rating = 4;
        rankingScore = 8;
        tags = ["marketing", "content", "ai", "copywriting"];
        bestFor = ["Marketers", "Business"];
        pros = ["Templates", "SEO-focused"];
        cons = ["Expensive"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 7;
        name = "Grammarly";
        slug = "grammarly";
        description = "AI-powered writing assistant";
        categories = ["Productivity", "Content Creation"];
        pricing = #freemium;
        website = "https://grammarly.com";
        rating = 5;
        rankingScore = 10;
        tags = ["writing", "grammar", "ai", "editor"];
        bestFor = ["Writers", "Students"];
        pros = ["Accurate", "Real-time"];
        cons = ["Premium features locked"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        id = 8;
        name = "Runway ML";
        slug = "runway-ml";
        description = "AI video editing and generation platform";
        categories = ["Image Editing", "Content Creation"];
        pricing = #freemium;
        website = "https://runwayml.com";
        rating = 4;
        rankingScore = 8;
        tags = ["video", "ai", "editing", "creative"];
        bestFor = ["Video Creators", "Filmmakers"];
        pros = ["Powerful tools", "Innovative"];
        cons = ["Complex interface"];
        createdAt = Time.now();
        updatedAt = Time.now();
      },
    ];

    for (tool in initialTools.values()) {
      tools.add(tool.id, tool);
      nextId += 1;
    };
  };

  seedInitialTools();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Tool Management Functions
  public shared ({ caller }) func addTool(tool : Tool) : async () {
    // Admin-only: Only admins can add tools
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add tools");
    };

    let newTool : Tool = {
      tool with
      id = nextId;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    tools.add(nextId, newTool);
    nextId += 1;
  };

  // Public query functions - no authentication required
  public query func getAllTools() : async [Tool] {
    tools.values().toArray();
  };

  public query func getToolBySlug(slug : Text) : async ?Tool {
    let allTools = tools.values().toArray();
    switch (allTools.find(func(t) { t.slug == slug })) {
      case (null) { null };
      case (?tool) { ?tool };
    };
  };

  public query func getToolsByCategory(category : Text) : async [Tool] {
    tools.values().toArray().filter(
      func(t) { t.categories.find(func(cat) { cat == category }) != null }
    );
  };

  public query func searchTools(keyword : Text) : async [Tool] {
    var results = List.empty<Tool>();

    for (tool in tools.values()) {
      if (hasKeyword(tool.tags, keyword) or
          hasKeyword(tool.bestFor, keyword) or
          hasKeyword(tool.categories, keyword)) {
        results.add(tool);
      };
    };

    let resultsArray = results.toArray();
    resultsArray.sort();
  };

  func hasKeyword(array : [Text], keyword : Text) : Bool {
    switch (array.find(func(item) { item == keyword })) {
      case (null) { false };
      case (?_) { true };
    };
  };
};
