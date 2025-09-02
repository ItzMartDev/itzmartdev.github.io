-- Roblox Studio Anime Information Loader
-- Fixes array detection logic for loading all anime entries from JSON files

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Cache for loaded anime data
local animeCache = {}
local isLoaded = false

-- Debug logging function
local function debugLog(message)
    print("[AnimeLoader] " .. message)
end

-- Function to validate if an object is a valid anime entry
local function isValidAnime(animeObj)
    if type(animeObj) ~= "table" then
        return false
    end
    
    -- Check for required fields
    local requiredFields = {"id", "title", "type", "episodes"}
    for _, field in ipairs(requiredFields) do
        if animeObj[field] == nil then
            debugLog("Invalid anime object: missing field '" .. field .. "'")
            return false
        end
    end
    
    -- Validate data types
    if type(animeObj.id) ~= "number" then
        debugLog("Invalid anime object: 'id' must be a number")
        return false
    end
    
    if type(animeObj.title) ~= "string" or animeObj.title == "" then
        debugLog("Invalid anime object: 'title' must be a non-empty string")
        return false
    end
    
    return true
end

-- Improved function to detect if a table is an array
local function isArray(t)
    if type(t) ~= "table" then
        return false
    end
    
    -- Check if table is empty
    local count = 0
    for _ in pairs(t) do
        count = count + 1
    end
    
    if count == 0 then
        return true -- Empty table can be considered an array
    end
    
    -- Check if all keys are consecutive numeric indices starting from 1
    local arrayLength = #t
    if arrayLength == 0 then
        return false -- Has elements but # returns 0, likely not an array
    end
    
    -- Verify all indices from 1 to arrayLength exist
    for i = 1, arrayLength do
        if t[i] == nil then
            return false
        end
    end
    
    -- Check if there are any non-numeric keys
    local numericCount = 0
    for k, v in pairs(t) do
        if type(k) == "number" and k >= 1 and k <= arrayLength and k == math.floor(k) then
            numericCount = numericCount + 1
        else
            return false -- Found non-numeric key or key outside valid range
        end
    end
    
    -- All keys should be accounted for
    return numericCount == arrayLength
end

-- Function to process anime data (single object or array)
local function processAnimeData(data)
    local processedAnime = {}
    local count = 0
    
    if isArray(data) then
        debugLog("Processing anime array with " .. #data .. " entries")
        
        -- Process each anime in the array using ipairs for proper array iteration
        for i, animeObj in ipairs(data) do
            if isValidAnime(animeObj) then
                table.insert(processedAnime, animeObj)
                count = count + 1
                debugLog("Loaded anime #" .. i .. ": " .. animeObj.title)
            else
                debugLog("Skipped invalid anime at index " .. i)
            end
        end
    else
        debugLog("Processing single anime object")
        
        -- Handle single anime object
        if isValidAnime(data) then
            table.insert(processedAnime, data)
            count = 1
            debugLog("Loaded single anime: " .. data.title)
        else
            debugLog("Skipped invalid single anime object")
        end
    end
    
    debugLog("Successfully processed " .. count .. " anime entries")
    return processedAnime, count
end

-- Function to load anime data from a JSON file
local function loadAnimeFromFile(filePath)
    local success, result = pcall(function()
        -- In a real Roblox environment, you would use HttpService to fetch from a URL
        -- For this example, we'll simulate loading from the file system
        local jsonData = HttpService:GetAsync("https://raw.githubusercontent.com/ItzMartDev/itzmartdev.github.io/main/RobloxStudio/" .. filePath)
        
        -- Decode JSON data
        local decodedData = HttpService:JSONDecode(jsonData)
        
        -- Process the decoded data
        return processAnimeData(decodedData)
    end)
    
    if success then
        return result
    else
        debugLog("Error loading anime from " .. filePath .. ": " .. tostring(result))
        return {}, 0
    end
end

-- Main function to load all anime from JSON files
function loadAllAnime()
    debugLog("Starting to load all anime data...")
    
    if isLoaded then
        debugLog("Anime data already loaded. Total cached anime: " .. #animeCache)
        return animeCache
    end
    
    -- Clear cache
    animeCache = {}
    local totalLoaded = 0
    
    -- List of JSON files to load (add more as needed)
    local jsonFiles = {
        "1.json"
        -- Add more JSON files here as they become available
        -- "2.json",
        -- "3.json",
    }
    
    -- Load anime from each JSON file
    for _, fileName in ipairs(jsonFiles) do
        debugLog("Loading anime from " .. fileName)
        
        local animeList, count = loadAnimeFromFile(fileName)
        
        -- Add loaded anime to cache
        for _, anime in ipairs(animeList) do
            table.insert(animeCache, anime)
        end
        
        totalLoaded = totalLoaded + count
        debugLog("Loaded " .. count .. " anime from " .. fileName)
    end
    
    debugLog("=== LOADING COMPLETE ===")
    debugLog("Total anime loaded: " .. totalLoaded)
    debugLog("Total anime in cache: " .. #animeCache)
    
    isLoaded = true
    return animeCache
end

-- Function to get anime by ID
function getAnimeById(id)
    if not isLoaded then
        loadAllAnime()
    end
    
    for _, anime in ipairs(animeCache) do
        if anime.id == id then
            return anime
        end
    end
    
    debugLog("Anime with ID " .. id .. " not found")
    return nil
end

-- Function to search anime by title
function searchAnimeByTitle(searchTerm)
    if not isLoaded then
        loadAllAnime()
    end
    
    local results = {}
    local searchLower = string.lower(searchTerm)
    
    for _, anime in ipairs(animeCache) do
        if string.find(string.lower(anime.title), searchLower) then
            table.insert(results, anime)
        end
    end
    
    debugLog("Found " .. #results .. " anime matching '" .. searchTerm .. "'")
    return results
end

-- Function to get all loaded anime
function getAllAnime()
    if not isLoaded then
        loadAllAnime()
    end
    
    return animeCache
end

-- Function to get anime count
function getAnimeCount()
    if not isLoaded then
        loadAllAnime()
    end
    
    return #animeCache
end

-- Function to reload anime data
function reloadAnimeData()
    debugLog("Reloading anime data...")
    isLoaded = false
    animeCache = {}
    return loadAllAnime()
end

-- Initialize anime loading when script starts
debugLog("AnimeInformation script loaded. Call loadAllAnime() to load data.")

-- Export functions for external use
return {
    loadAllAnime = loadAllAnime,
    getAnimeById = getAnimeById,
    searchAnimeByTitle = searchAnimeByTitle,
    getAllAnime = getAllAnime,
    getAnimeCount = getAnimeCount,
    reloadAnimeData = reloadAnimeData,
    isArray = isArray, -- Export for testing
    isValidAnime = isValidAnime, -- Export for testing
}