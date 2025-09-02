-- Example usage script for GetAnimeInformation.lua
-- This demonstrates how to use the anime loader in a Roblox Studio environment

local AnimeInformation = require(script.GetAnimeInformation)

-- Example 1: Load all anime data
print("=== Loading All Anime ===")
local allAnime = AnimeInformation.loadAllAnime()
print("Total anime loaded:", AnimeInformation.getAnimeCount())

-- Example 2: Get specific anime by ID
print("\n=== Getting Specific Anime ===")
local cowboyBebop = AnimeInformation.getAnimeById(1)
if cowboyBebop then
    print("Found anime:", cowboyBebop.title)
    print("Type:", cowboyBebop.type)
    print("Episodes:", cowboyBebop.episodes)
    print("Score:", cowboyBebop.score)
else
    print("Anime not found")
end

-- Example 3: Search anime by title
print("\n=== Searching Anime ===")
local searchResults = AnimeInformation.searchAnimeByTitle("Gundam")
print("Found", #searchResults, "anime containing 'Gundam':")
for i, anime in ipairs(searchResults) do
    if i <= 5 then -- Show first 5 results
        print("  " .. i .. ". " .. anime.title .. " (ID: " .. anime.id .. ")")
    end
end
if #searchResults > 5 then
    print("  ... and " .. (#searchResults - 5) .. " more")
end

-- Example 4: Get all anime and show some statistics
print("\n=== Anime Statistics ===")
local allAnime = AnimeInformation.getAllAnime()
local typeCount = {}
local totalEpisodes = 0

for _, anime in ipairs(allAnime) do
    -- Count by type
    typeCount[anime.type] = (typeCount[anime.type] or 0) + 1
    
    -- Sum episodes
    if type(anime.episodes) == "number" then
        totalEpisodes = totalEpisodes + anime.episodes
    end
end

print("Anime by type:")
for animeType, count in pairs(typeCount) do
    print("  " .. animeType .. ": " .. count)
end
print("Total episodes across all anime:", totalEpisodes)

-- Example 5: Demonstrate the fixed array detection
print("\n=== Array Detection Examples ===")

-- Test with single anime object
local singleAnime = {
    id = 999,
    title = "Test Single Anime",
    type = "OVA",
    episodes = 2
}

-- Test with array of anime
local animeArray = {
    {
        id = 1001,
        title = "Test Anime 1",
        type = "TV",
        episodes = 12
    },
    {
        id = 1002,
        title = "Test Anime 2", 
        type = "Movie",
        episodes = 1
    }
}

print("Single anime object is array:", AnimeInformation.isArray(singleAnime))
print("Anime array is array:", AnimeInformation.isArray(animeArray))
print("Single anime is valid:", AnimeInformation.isValidAnime(singleAnime))
print("Array elements are valid:")
for i, anime in ipairs(animeArray) do
    print("  Element " .. i .. ":", AnimeInformation.isValidAnime(anime))
end

-- Example 6: Reload data (useful for testing)
print("\n=== Reloading Data ===")
local reloadedAnime = AnimeInformation.reloadAnimeData()
print("Reloaded anime count:", #reloadedAnime)