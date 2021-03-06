package com.desipandora.client;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SongEntry
{
  public enum SongEntryType
  {
    YOUTUBE, MP3
  }

  private String       songId;
  private String       title;
  private List<String> artists;
  private String       albums;
  private String Description;
  private List<String> keyWords;
  float                youTubeRating;
  private String          relatedFeedString;
  private SongEntryType type;
  private Set<String> titleWordsSet;
  private int duration;

  /**
 * @return the duration
 */
public int getDuration() {
	return duration;
}

/**
 * @param duration the duration to set
 */
public void setDuration(int duration) {
	this.duration = duration;
}

public String getDescription() {
	return Description;
}

public void setDescription(String description) {
	Description = description;
}

public List<String> getKeyWords() {
	return keyWords;
}

public void setKeyWords(List<String> keyWords) {
	this.keyWords = keyWords;
}

public float getYouTubeRating() {
	return youTubeRating;
}

public void setYouTubeRating(float youTubeRating) {
	this.youTubeRating = youTubeRating;
}

public SongEntry(String songID, SongEntryType type)
  {
    setSongId(songID);
    setType(type);
    titleWordsSet = new HashSet<String>();
  }
  
  public String getRelatedFeedString() {
	return relatedFeedString;
}

public void setRelatedFeedString (String relatedFeedString) {
	this.relatedFeedString = relatedFeedString ;
}

public String getSongId()
  {
    return songId;
  }

  public void setSongId(String songId)
  {
    this.songId = songId;
  }

  public String getTitle()
  {
    return title;
  }

  public void setTitle(String title)
  {
    this.title = title;
    String trimmedTitle = this.title.replaceAll("[^A-Za-z0-9 ]", " ");
    String[] splittedTitle = trimmedTitle.split("[\\s]+");
    for(int i = 0; i<splittedTitle.length; i++){
    	//System.out.println("TOKENS : "+splittedTitle[i]);
    	titleWordsSet.add(splittedTitle[i]);
    }
  }	

  public Set<String> getTitleWordsSet(){
	  return titleWordsSet;
  }
  
  public List<String> getArtists()
  {
    return artists;
  }

  public void setArtists(List<String> artists)
  {
    this.artists = artists;
  }

  public String getAlbums()
  {
    return albums;
  }

  public void setAlbums(String albums)
  {
    this.albums = albums;
  }

  public void setType(SongEntryType type)
  {
    this.type = type;
  }
  public SongEntryType getType()
  {
    return type;
  }
}
