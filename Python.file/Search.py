# import the required modules
import requests
from bs4 import BeautifulSoup


# Function will get all the ranks of the website
# by searching the keyword in google and returns
# a string of ranks or Website Missing if the website
# doesn't occur in the given number of search queries.
def find_rank(keyword, website, search_query):
    # Initialise the required variables
    rank, rank_list = 1, ""

    # Base search url of google
    url = "https://www.google.com/search?q="

    # Replaces whitespace with "+" in keyword
    keyword = keyword.replace(" ", "+")

    # Base url is updated with the keyword to be
    # searched in given number of search results.
    url = url + keyword + "&num=" + str(search_query)

    # requests.get(url) returns a response that is saved
    # in a response object called page.
    page = requests.get(url)

    # page.text gives us access to the web data in text
    # format, we pass it as an argument to BeautifulSoup
    # along with the html.parser which will create a

    # parsed tree in soup.
    soup = BeautifulSoup(page.text, 'html.parser')

    # soup.find_all finds the div, all having the same
    # class "ZINbbc xpd O9g5cc uUPGi" that is stored
    # in result_div
    result_div = soup.find_all(
        'div', attrs={'class': 'ZINbbc xpd O9g5cc uUPGi'})

    # Iterate result_div and check for the given website
    # inside <a> tag adding the rank to the
    # rank_list if found.
    for div in result_div:
        try:

            # Finds <a> tag and checks if the url is present,
            # if present then check with the provided
            # website in main()
            link = div.find("a", href=True)
            if link['href'][7:7 + len(website)] == website:
                rank_list += str(rank) + ","
            rank += 1
        except:
            pass
        return (rank_list, "Website Missing")[rank_list == ""]

     # Main Function
        if __name__ == "__main__":
            keyword = "dsa practice questions"
            website = "https://www.mobitechsolution.co.ke/"
            search_query = 30
            rank = find_rank(keyword, website, search_query)

            if rank == "Website Missing":
                print(rank)
                #else:
                print("Rank of Website :", rank[:-1])
            