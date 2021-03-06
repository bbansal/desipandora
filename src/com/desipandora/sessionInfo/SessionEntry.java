/**
 * 
 */
package com.desipandora.sessionInfo;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.desipandora.client.SongEntry;

/**
 * @author abhishek
 *
 */
public class SessionEntry {
	String userId;
	long timeStamp;
	Map<String, SongFeedbackEntry> songFeedbackEntryMap;
	PlayList playList;
	//final String[]  blackList = {"trailer", "movie", "making", "karaoke", "sings", "teaser", "promo", "scene"}; 
    private Set<String> blackListSet; 
	

	public SessionEntry(String userId) {
		super();
		this.userId = userId;
		this.songFeedbackEntryMap = new HashMap<String, SongFeedbackEntry>();
		this.timeStamp = (new Date()).getTime();
		this.playList = new PlayList();
		String[] temp = {"trailer", "movie", "making", "karaoke", "sings", "teaser", "promo", 
						 "scene", "hot", "nude", "porn", "webcam", "interview", "guitar", "funny",
						 "documentary", "contest", "audition"};
		this.blackListSet = new HashSet<String>(Arrays.asList(temp));
	}

	public void addPlayListToSession(PlayList playList){
		
		Iterator<SongEntry> iterPlayList = playList.getPlayList().iterator();
		this.playList.setPlayList(playList.getPlayList());
		this.playList.setIndexRelatedFeedSeed(playList.getIndexRelatedFeedSeed());
		this.playList.setIndexNextRecommendation(playList.getIndexNextRecommendation());
		while(iterPlayList.hasNext()){
			SongEntry songEntry = iterPlayList.next();
			songFeedbackEntryMap.put(songEntry.getSongId(), new SongFeedbackEntry(songEntry, 0.0));
		}
	}

	public void removeSongFromMap(String songId){
		songFeedbackEntryMap.remove(songId);
	}
	
	public boolean songExists(String songId){
		return songFeedbackEntryMap.containsKey(songId);
	}
	
	public void addFeedbackToSong(String songId, double feedback){
		songFeedbackEntryMap.get(songId).setFeedBack(feedback);
	}
	
	public double getFeedbackForSong(String songId){
		return songFeedbackEntryMap.get(songId).getFeedBack();
	}
	public PlayList getPlayList() {
		return playList;
	}

	public void setPlayList(PlayList playList) {
		this.playList = playList;
	}
	
	public Set<String> getBlackListSet(){
		return blackListSet;
	}
	
	public void printPlayList(){
		List<SongEntry> songEntryList = playList.getPlayList();
		Iterator<SongEntry> iterSongEntryList = songEntryList.iterator();
		System.out.println("Playlist counterNextSeed is at "+playList.getIndexRelatedFeedSeed() +" counterNextrecommendation is at "+playList.getIndexNextRecommendation());
		while(iterSongEntryList.hasNext()){
			System.out.println("PlayList title : " + iterSongEntryList.next().getTitle());
		}
	}
	// Some more functions to be added later
	// getAllRatingsAbove(double rating);
	// getAverageRating();

	
	
	
	
}
